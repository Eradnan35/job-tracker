from fastapi.testclient import TestClient
from app.main import app
from app.db.database import get_db, Base, engine
from sqlalchemy.orm import sessionmaker

# Don't recreate tables, just use existing DB
client = TestClient(app)

def test():
    print("Logging in to get token...")
    res = client.post("/auth/login", data={"username": "test45@example.com", "password": "password123"})
    token = res.json()["access_token"]
    
    print("Creating job...")
    try:
        res = client.post("/jobs/", headers={"Authorization": f"Bearer {token}"}, json={
            "title": "Software Engineer",
            "company": "Google",
            "location": "Remote",
            "status": "applied"
        })
        print(res.status_code, res.text)
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test()
