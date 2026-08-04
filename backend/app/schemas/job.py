import uuid
from datetime import datetime
from pydantic import BaseModel, Field
from app.models.job import JobStatus


class JobCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    company: str = Field(..., min_length=1, max_length=200)
    location: str | None = Field(None, max_length=200)
    status: JobStatus = JobStatus.SAVED


class JobUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=200)
    company: str | None = Field(None, min_length=1, max_length=200)
    location: str | None = Field(None, max_length=200)
    status: JobStatus | None = None


class JobResponse(BaseModel):
    id: uuid.UUID
    title: str
    company: str
    location: str | None
    status: JobStatus
    created_at: datetime
    user_id: uuid.UUID

    model_config = {"from_attributes": True}
