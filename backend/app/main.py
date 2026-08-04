from fastapi import FastAPI
from app.routers import auth, job

app = FastAPI(
    title="Job Tracker API",
    description="Track your job applications — register, login, and manage jobs.",
    version="1.0.0",
)

app.include_router(auth.router)
app.include_router(job.router)


@app.get("/", tags=["Root"])
def root():
    return {"message": "Job Tracker API is running. Visit /docs for the API reference."}
