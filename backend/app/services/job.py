import uuid
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate


def create_job(db: Session, data: JobCreate, user_id: uuid.UUID) -> Job:
    job = Job(
        id=uuid.uuid4(),
        user_id=user_id,
        **data.model_dump(),
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def get_user_jobs(db: Session, user_id: uuid.UUID) -> list[Job]:
    return db.query(Job).filter(Job.user_id == user_id).all()


def get_job(db: Session, job_id: uuid.UUID, user_id: uuid.UUID) -> Job:
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
    if job.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")
    return job


def update_job(db: Session, job_id: uuid.UUID, data: JobUpdate, user_id: uuid.UUID) -> Job:
    job = get_job(db, job_id, user_id)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job


def delete_job(db: Session, job_id: uuid.UUID, user_id: uuid.UUID) -> None:
    job = get_job(db, job_id, user_id)
    db.delete(job)
    db.commit()
