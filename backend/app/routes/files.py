import os
import uuid
from typing import Dict, List

from fastapi import APIRouter, File, HTTPException, UploadFile
from pdfminer.high_level import extract_text

from ..config import UPLOAD_DIR
from ..models import UploadResponse, UploadedFileModel

router = APIRouter()


@router.post("/files/upload")
async def upload_files(
    files: List[UploadFile] = File(...),
) -> Dict[str, UploadResponse]:
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

    return {
        "success": True,
        "data": UploadResponse(fileIds=[u.id for u in uploaded], files=uploaded),
    }
