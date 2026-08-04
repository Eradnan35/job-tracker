import uuid
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


# ---------------------------------------------------------------------------
# Request schemas (what the client sends)
# ---------------------------------------------------------------------------

class RegisterRequest(BaseModel):
    """Body for POST /auth/register."""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    # Enforce a minimum password length at the schema level.
    password: str = Field(..., min_length=8)


class LoginRequest(BaseModel):
    """Body for POST /auth/login."""
    email: EmailStr
    password: str


# ---------------------------------------------------------------------------
# Response schemas (what the API returns)
# ---------------------------------------------------------------------------

class UserResponse(BaseModel):
    """Public user data — never exposes password_hash."""
    id: uuid.UUID
    name: str
    email: str
    created_at: datetime

    # orm_mode (v1) / from_attributes (v2) lets Pydantic read SQLAlchemy
    # model instances directly instead of requiring a plain dict.
    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    """Returned after a successful login or register."""
    access_token: str
    token_type: str = "bearer"
