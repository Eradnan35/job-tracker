# env.py — Alembic migration environment.
# This file is executed by every `alembic` CLI command.
# Our job here is to:
#   1. Point Alembic at the correct database URL (read from .env).
#   2. Give Alembic access to Base.metadata so it can diff models vs DB schema.

import os
import sys
from logging.config import fileConfig

from dotenv import load_dotenv
from sqlalchemy import engine_from_config, pool
from alembic import context

# ---------------------------------------------------------------------------
# 1. Make sure 'app' is importable.
#    alembic/env.py lives at backend/app/alembic/env.py.
#    Going up two levels lands at backend/, which is the directory that
#    *contains* the 'app' package — exactly what Python needs on sys.path
#    so that `import app.models` resolves correctly.
# ---------------------------------------------------------------------------
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

# ---------------------------------------------------------------------------
# 2. Load .env so DATABASE_URL is available via os.getenv().
# ---------------------------------------------------------------------------
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

# ---------------------------------------------------------------------------
# 3. Import models — IMPORTANT.
#    Importing the models package triggers models/__init__.py, which imports
#    User and Job. This registers both classes on Base.metadata so Alembic
#    can detect them during autogenerate.
# ---------------------------------------------------------------------------
import app.models  # noqa: F401  — side-effect import to populate Base.metadata
from app.db.database import Base

# ---------------------------------------------------------------------------
# Alembic Config object — gives access to values from alembic.ini.
# ---------------------------------------------------------------------------
config = context.config

# Set up Python logging from the [loggers] section of alembic.ini.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ---------------------------------------------------------------------------
# 4. Override sqlalchemy.url with the value from .env.
#    This is the key line: it replaces the blank entry in alembic.ini at
#    runtime, keeping credentials out of version control.
# ---------------------------------------------------------------------------
config.set_main_option("sqlalchemy.url", os.environ["DATABASE_URL"])

# target_metadata tells Alembic what "the truth" looks like (our ORM models).
# Passing Base.metadata enables --autogenerate to create accurate diffs.
target_metadata = Base.metadata


# ---------------------------------------------------------------------------
# Offline mode: generate SQL scripts without a live DB connection.
# ---------------------------------------------------------------------------
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


# ---------------------------------------------------------------------------
# Online mode: run migrations against a live DB connection (normal usage).
# ---------------------------------------------------------------------------
def run_migrations_online() -> None:
    # NullPool prevents Alembic from reusing connections after the migration
    # finishes — important in scripts and CI pipelines.
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
