# routers/auth.py — Authentication endpoints.
# The router is kept thin: it handles HTTP concerns only (status codes,
# request/response shapes) and delegates all logic to the service layer.

from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import RegisterRequest, UserResponse, TokenResponse
from app.services.auth import register_user, login_user
from app.dependencies import get_current_user
from app.models.user import User

# prefix="/auth" means all routes here become /auth/...
router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
)
def register(data: RegisterRequest, db: Session = Depends(get_db)) -> TokenResponse:
    """
    Create a new account and return a JWT access token.

    - Returns **201** on success.
    - Returns **409** if the email is already taken.
    - Returns **422** if the request body fails validation.
    """
    _, token = register_user(data, db)
    return TokenResponse(access_token=token)


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Log in and receive an access token",
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> TokenResponse:
    _, token = login_user(form_data.username, form_data.password, db)
    return TokenResponse(access_token=token)


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Get the current authenticated user",
)
def me(current_user: User = Depends(get_current_user)) -> UserResponse:
    """
    Return profile data for the user identified by the Bearer token.

    - Returns **200** with user data on success.
    - Returns **401** if the token is missing or invalid.
    """
    return UserResponse.model_validate(current_user)
