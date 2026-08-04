# Makes 'models' a Python package.
# Importing both models here ensures they are registered on Base.metadata
# before Alembic tries to read it.
from app.models.user import User
from app.models.job import Job
