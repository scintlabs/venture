from typing import Dict, List, Optional
from pydantic import BaseModel


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


class GenerateRequest(FormData):
    fileIds: List[str]
