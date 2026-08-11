import requests
import json

base_url = "http://localhost:8000"

def test():
    # 1. Register a user
    print("Registering user...")
    res = requests.post(f"{base_url}/auth/register", json={
        "name": "Test User",
        "email": "test45@example.com",
        "password": "password123"
    })
    print(res.status_code, res.text)
    
    if res.status_code == 400 and "already registered" in res.text:
        pass # already exists
        
    # 2. Login
    print("\nLogging in...")
    res = requests.post(f"{base_url}/auth/login", data={
        "username": "test45@example.com",
        "password": "password123"
    })
    print(res.status_code, res.text)
    token = res.json().get("access_token")
    
    # 3. Create a job
    print("\nCreating a job...")
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.post(f"{base_url}/jobs/", headers=headers, json={
        "title": "Software Engineer",
        "company": "Google",
        "location": "Remote",
        "status": "applied"
    })
    print(res.status_code, res.text)

if __name__ == "__main__":
    test()
