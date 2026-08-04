import uuid
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate
from app.repositories import job as job_repo


def create_job(db: Session, data: JobCreate, user_id: uuid.UUID) -> Job:
    return job_repo.create(db, data, user_id)


def get_user_jobs(db: Session, user_id: uuid.UUID) -> list[Job]:
    return job_repo.get_all_by_user(db, user_id)


def get_job(db: Session, job_id: uuid.UUID, user_id: uuid.UUID) -> Job:
    job = job_repo.get_by_id(db, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
    if job.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")
    return job


def update_job(db: Session, job_id: uuid.UUID, data: JobUpdate, user_id: uuid.UUID) -> Job:
    job = get_job(db, job_id, user_id)
    return job_repo.update(db, job, data)


def delete_job(db: Session, job_id: uuid.UUID, user_id: uuid.UUID) -> None:
    job = get_job(db, job_id, user_id)
    job_repo.delete(db, job)
