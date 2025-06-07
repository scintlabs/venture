import json
import os
import uuid
from datetime import datetime
from typing import Dict

from fastapi import APIRouter, HTTPException

try:
    import openai  # type: ignore
except Exception:  # pragma: no cover
    openai = None

from ..config import PROPOSAL_DIR
from ..models import GenerateRequest, Proposal

router = APIRouter()

SECTION_PROMPTS: Dict[str, str] = {
    "executiveSummary": "Create an executive summary for the project.",
    "problemStatement": "Describe the problem statement for the project.",
    "objectives": "List the project objectives.",
    "solution": "Provide a solution overview.",
    "timeline": "Provide a timeline of milestones.",
    "team": "Suggest the team composition.",
    "budget": "Provide a simple budget breakdown.",
}


def _save_proposal(proposal_id: str, proposal: Proposal) -> None:
    path = os.path.join(PROPOSAL_DIR, f"{proposal_id}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(proposal.model_dump(), f, indent=2)


@router.post("/proposals/generate")
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

    md_lines = [f"# {req.projectName}\n"]
    for section_key, data in proposal.sections.items():
        md_lines.append(f"## {section_key.replace('_', ' ').title()}\n")
        md_lines.append(json.dumps(data, indent=2))
        md_lines.append("")
    proposal.markdown = "\n".join(md_lines)

    _save_proposal(proposal_id, proposal)
    return {"success": True, "data": {"proposalId": proposal_id}}


@router.get("/proposals/{proposal_id}")
async def get_proposal(proposal_id: str) -> Proposal:
    path = os.path.join(PROPOSAL_DIR, f"{proposal_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Proposal not found")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return Proposal(**data)


@router.get("/proposals/sample")
async def get_sample_proposal() -> Proposal:
    sample_path = os.path.join(
        os.path.dirname(__file__), "../data/sample_proposal.json"
    )
    with open(sample_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return Proposal(**data)
