import json
import os
import uuid
from datetime import datetime
from typing import Dict, List, Optional

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

try:
    import openai  # type: ignore
except Exception:  # pragma: no cover
    openai = None

try:
    from pdfminer.high_level import extract_text  # type: ignore
except Exception:  # pragma: no cover
    def extract_text(_):
        return ""


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
PROPOSAL_DIR = os.path.join(os.getcwd(), "proposals")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROPOSAL_DIR, exist_ok=True)

app.mount("/files", StaticFiles(directory=UPLOAD_DIR), name="files")


class FormData(BaseModel):
    projectName: str
    clientName: str
    industry: str
    timeline: str
    budget: str
    objectives: str
    description: str
    stakeholders: Optional[str] = None
    requirements: Optional[str] = None


class UploadedFileModel(BaseModel):
    id: str
    filename: str
    originalName: str
    content: str
    type: str
    url: str


class Proposal(BaseModel):
    id: str
    createdAt: str
    formData: FormData
    sections: Dict[str, dict]
    markdown: str = ""


class UploadResponse(BaseModel):
    fileIds: List[str]
    files: List[UploadedFileModel]


@app.post("/files/upload")
async def upload_files(files: List[UploadFile] = File(...)) -> Dict[str, UploadResponse]:
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")

    uploaded: List[UploadedFileModel] = []

    for file in files:
        file_id = str(uuid.uuid4())
        filename = f"{file_id}-{file.filename}"
        path = os.path.join(UPLOAD_DIR, filename)
        data = await file.read()
        with open(path, "wb") as f:
            f.write(data)

        text = ""
        if file.content_type == "application/pdf":
            try:
                text = extract_text(path)
            except Exception as e:  # pragma: no cover - best effort
                print("PDF parse error", e)
                text = "PDF parsing failed"
        elif file.content_type.startswith("text/"):
            text = data.decode("utf-8")
        else:
            text = "Binary file - content not extracted"

        uploaded.append(
            UploadedFileModel(
                id=file_id,
                filename=filename,
                originalName=file.filename,
                content=text,
                type=file.content_type,
                url=f"/files/{filename}",
            )
        )

    return {"success": True, "data": UploadResponse(fileIds=[u.id for u in uploaded], files=uploaded)}


class GenerateRequest(FormData):
    fileIds: List[str]


SECTION_PROMPTS: Dict[str, str] = {
    "executiveSummary": "Create an executive summary for the project.",
    "problemStatement": "Describe the problem statement for the project.",
    "objectives": "List the project objectives.",
    "solution": "Provide a solution overview.",
    "timeline": "Provide a timeline of milestones.",
    "team": "Suggest the team composition.",
    "budget": "Provide a simple budget breakdown.",
}


async def save_proposal(proposal_id: str, proposal: Proposal) -> None:
    path = os.path.join(PROPOSAL_DIR, f"{proposal_id}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(proposal.model_dump(), f, indent=2)


@app.post("/proposals/generate")
async def generate_proposal(req: GenerateRequest) -> Dict[str, dict]:
    proposal_id = str(uuid.uuid4())
    proposal = Proposal(
        id=proposal_id,
        createdAt=datetime.utcnow().isoformat(),
        formData=req,
        sections={},
    )

    context = req.model_dump_json()

    for key, prompt in SECTION_PROMPTS.items():
        if openai is None or not os.getenv("OPENAI_API_KEY"):
            proposal.sections[key] = {"content": f"{prompt} (stubbed)"}
            continue
        try:
            completion = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"{prompt}\n\nContext:\n{context}"},
                ],
                temperature=0.7,
                max_tokens=1500,
            )
            content = completion.choices[0].message.content
            proposal.sections[key] = json.loads(content or "{}")
        except Exception as e:  # pragma: no cover
            print("OpenAI error", e)
            proposal.sections[key] = {
                "error": "Generation failed",
                "fallback": f"Please manually complete the {key} section.",
            }

    # build simple markdown representation
    md_lines = [f"# {req.projectName}\n"]
    for section_key, data in proposal.sections.items():
        md_lines.append(f"## {section_key.replace('_', ' ').title()}\n")
        md_lines.append(json.dumps(data, indent=2))
        md_lines.append("")
    proposal.markdown = "\n".join(md_lines)

    await save_proposal(proposal_id, proposal)
    return {"success": True, "data": {"proposalId": proposal_id}}


@app.get("/proposals/{proposal_id}")
async def get_proposal(proposal_id: str) -> Proposal:
    path = os.path.join(PROPOSAL_DIR, f"{proposal_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Proposal not found")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return Proposal(**data)


if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
