import uuid
from sqlalchemy.orm import Session
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate


def create(db: Session, data: JobCreate, user_id: uuid.UUID) -> Job:
    job = Job(
        id=uuid.uuid4(),
        user_id=user_id,
        **data.model_dump(),
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def get_all_by_user(db: Session, user_id: uuid.UUID) -> list[Job]:
    return db.query(Job).filter(Job.user_id == user_id).all()


def get_by_id(db: Session, job_id: uuid.UUID) -> Job | None:
    return db.query(Job).filter(Job.id == job_id).first()


def update(db: Session, job: Job, data: JobUpdate) -> Job:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job


def delete(db: Session, job: Job) -> None:
    db.delete(job)
    db.commit()
