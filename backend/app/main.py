from fastapi import FastAPI
from fastapi.responses import Response
from app.routers import auth, job

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Job Tracker API",
    description="Track your job applications — register, login, and manage jobs.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(job.router)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)


@app.get("/", tags=["Root"])
def root():
    return {"message": "Job Tracker API is running. Visit /docs for the API reference."}
