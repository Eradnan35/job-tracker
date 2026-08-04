# config.py — Central settings loader.
# Reads auth-related environment variables from .env using pydantic-settings.
# Centralising config here means every module imports from one place
# instead of scattering os.getenv() calls across the codebase.

import os
from dotenv import load_dotenv

# Load .env relative to this file: core/ -> app/ -> .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))


class Settings:
    # Used to sign JWT tokens — must be a long, random, secret string.
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")

    # HS256 is a symmetric HMAC algorithm — fast and sufficient for APIs.
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")

    # Token lifetime in minutes (default 30).
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )


# Single shared instance — import this everywhere.
settings = Settings()
