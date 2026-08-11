# security.py — Reusable cryptographic utilities.
# Keeps all password hashing and JWT logic in one place so it can be
# tested and reused without importing FastAPI concerns.

from datetime import datetime, timedelta, timezone
from typing import Any

from jose import jwt, JWTError
import bcrypt
from app.core.config import settings

def hash_password(plain_password: str) -> str:
    """Return a bcrypt hash of the given plain-text password."""
    # bcrypt requires bytes
    pwd_bytes = plain_password.encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return True if plain_password matches the stored hash, False otherwise."""
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'),
            hashed_password.encode('utf-8')
        )
    except Exception:
        return False


def create_access_token(subject: str, expires_delta: timedelta | None = None) -> str:
    """
    Create a signed JWT access token.

    Args:
        subject:      The value to store in the 'sub' claim — typically user ID.
        expires_delta: Optional custom lifetime; defaults to settings value.

    Returns:
        A compact, URL-safe JWT string.
    """
    expire = datetime.now(timezone.utc) + (
        expires_delta
        if expires_delta
        else timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    # Standard JWT claims:
    # "sub" — the subject (who the token was issued for)
    # "exp" — expiry timestamp (jose verifies this automatically)
    payload: dict[str, Any] = {"sub": subject, "exp": expire}

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> str:
    """
    Decode and verify a JWT token.

    Returns:
        The 'sub' claim (user ID as string).

    Raises:
        JWTError: If the token is invalid, expired, or tampered with.
    """
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    sub: str | None = payload.get("sub")
    if sub is None:
        raise JWTError("Token payload missing 'sub' claim.")
    return sub
