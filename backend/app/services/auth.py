# services/auth.py — Authentication business logic.
# All DB queries and domain rules live here, keeping the router thin.
# This layer knows about SQLAlchemy but nothing about HTTP.

import uuid
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.core.security import hash_password, verify_password, create_access_token


def register_user(data: RegisterRequest, db: Session) -> tuple[User, str]:
    """
    Create a new user account.

    Returns:
        Tuple of (created User ORM instance, JWT access token).

    Raises:
        409 Conflict  — if the email is already registered.
    """
    # Check for duplicate email before attempting an INSERT.
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = User(
        id=uuid.uuid4(),
        name=data.name,
        email=data.email,
        # Never store plain text — hash before persisting.
        password_hash=hash_password(data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)  # Reload DB-generated fields (e.g. created_at).

    token = create_access_token(subject=str(user.id))
    return user, token


def login_user(email: str, password: str, db: Session) -> tuple[User, str]:
    user = db.query(User).filter(User.email == email).first()

    # A real bcrypt hash used purely to keep verify_password running
    # in constant time when the user doesn't exist, preventing timing-based
    # user enumeration. Generated once with: hash_password("_dummy_")
    dummy_hash = "$2b$12$KIXuBpuJ7F5FyNbq0FXLZOl6p8QqX1234567890abcdefghijklm"
    password_ok = verify_password(password, user.password_hash if user else dummy_hash)

    if not user or not password_ok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(subject=str(user.id))
    return user, token


def get_user_by_id(user_id: str, db: Session) -> User:
    """
    Fetch a user by their UUID string.

    Raises:
        404 Not Found — if no user matches the ID.
    """
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
    return user
