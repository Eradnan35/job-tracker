# Job Tracker

A full-stack job application tracking system built to help job seekers manage, organize, and monitor their job applications from a single dashboard.

The project is designed as a structured personal job-tracking system where users can securely create an account, record job applications, update application statuses, manage their application data, and view an overall summary of their job-search activity.

Phase 1 focuses on building a reliable and maintainable full-stack foundation with authentication, job application CRUD operations, PostgreSQL persistence, protected APIs, and dashboard statistics.

---

## Project Overview

Managing multiple job applications through spreadsheets, notes, or bookmarks quickly becomes difficult.

Job Tracker provides a centralized system where a user can maintain all job applications in one place and track their current progress.

The core workflow is:

Register → Login → Dashboard → Add Job → View Jobs → Update Status → Dashboard Statistics

The application follows a clear separation between frontend, backend, and database responsibilities.

The frontend provides the user interface, the backend exposes REST APIs and handles business logic, and PostgreSQL stores persistent application data.

---

## Phase 1 Goal

The primary goal of Phase 1 is to deliver a functional Minimum Viable Product.

A Phase 1 user should be able to:

* Create an account
* Login securely
* Access protected application pages
* Add a job application
* View job applications
* Edit job applications
* Update application status
* Delete job applications
* View dashboard statistics
* Log out of the application

If these core capabilities work correctly, the Phase 1 MVP is considered complete.

---

## Core Features

### Authentication

The application provides user authentication using JWT-based authentication.

Users can:

* Register with name, email, and password
* Login using email and password
* Access protected application routes
* Retrieve their authenticated user information
* Logout from the application

Passwords are never stored as plain text. They are securely hashed before being persisted in the database.

The backend uses authentication dependencies to protect private API endpoints.

---

### Job Application Management

Authenticated users can manage their own job applications.

Each job application can contain:

* Company name
* Job title
* Job URL
* Location
* Application date
* Application status
* Notes
* Created timestamp
* Updated timestamp

Supported operations include:

```text
Create
Read
Update
Delete
```

Every job belongs to the authenticated user who created it.

---

### Application Status Tracking

The application uses a simple status model to represent the progress of an application.

Available statuses are:

```text
Saved
Applied
Assessment
Interview
Offer
Rejected
```

The status can be changed as the application progresses.

The system does not assume that every application must follow a strict sequence. For example, an application can move directly from Applied to Interview or from any stage to Rejected.

---

### Dashboard

The dashboard provides a quick overview of the user's application activity.

It displays statistics such as:

```text
Total Jobs
Saved
Applied
Assessment
Interview
Offer
Rejected
```

The dashboard obtains these statistics from the backend rather than calculating them from frontend data.

This provides a simple high-level view of the user's current job-search pipeline.

---

### Protected Data

User data is isolated at the backend level.

A user can only access job applications belonging to their own account.

The backend applies the authenticated user's identity when querying job records instead of trusting a user ID supplied by the frontend.

This prevents unauthorized access to another user's job applications.

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* JavaScript / JSX

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* Alembic

### Database

* PostgreSQL

### Development Tools

* Git
* GitHub
* Visual Studio Code
* FastAPI Swagger / OpenAPI documentation

---

## System Architecture

The application follows a layered full-stack architecture.

```text
                    ┌───────────────────┐
                    │       User        │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ React + Vite      │
                    │ Tailwind CSS      │
                    │ React Router      │
                    └─────────┬─────────┘
                              │
                              │ HTTP / REST API
                              ▼
                    ┌───────────────────┐
                    │     FastAPI       │
                    │     API Layer     │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Service Layer     │
                    │ Business Logic    │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Repository Layer  │
                    │ Database Access   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    SQLAlchemy     │
                    │      ORM          │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    PostgreSQL     │
                    └───────────────────┘
```

The main request flow is:

```text
Frontend Request
       ↓
FastAPI Router
       ↓
Authentication / Validation
       ↓
Service Layer
       ↓
Repository Layer
       ↓
SQLAlchemy
       ↓
PostgreSQL
       ↓
Response
       ↓
Frontend
```

This separation keeps API routing, business logic, and database operations independent from each other.

---

## Project Structure

The project is organized into two independent applications: `frontend` and `backend`.

```text
job-tracker/
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── db/
│   │   │   ├── session.py
│   │   │   └── base.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   └── job.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── auth.py
│   │   │   └── job.py
│   │   │
│   │   ├── repositories/
│   │   │   ├── user_repository.py
│   │   │   └── job_repository.py
│   │   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── job_service.py
│   │   │   └── dashboard_service.py
│   │   │
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── jobs.py
│   │   │   └── dashboard.py
│   │   │
│   │   └── utils/
│   │       └── helpers.py
│   │
│   ├── alembic/
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── .env
│   └── Dockerfile
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Loader.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── DashboardStats.jsx
│   │   │   │
│   │   │   ├── jobs/
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── JobTable.jsx
│   │   │   │   └── JobForm.jsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx
│   │   │       └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── AddJob.jsx
│   │   │   ├── EditJob.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── jobService.js
│   │   │   └── dashboardService.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

---

## Backend Architecture

The backend follows a layered architecture instead of placing database operations directly inside API route handlers.

### `api/`

Contains FastAPI routers responsible for handling HTTP requests and responses.

```text
auth.py
jobs.py
dashboard.py
```

The API layer should remain focused on request handling, validation, authentication dependencies, and returning responses.

---

### `services/`

Contains application-level business logic.

```text
auth_service.py
job_service.py
dashboard_service.py
```

The service layer coordinates operations between the API layer and repository layer.

This prevents business logic from becoming tightly coupled to FastAPI route handlers.

---

### `repositories/`

Contains database access operations.

```text
user_repository.py
job_repository.py
```

Repositories communicate with SQLAlchemy and PostgreSQL.

This provides a clear boundary between business logic and database persistence.

---

### `models/`

Contains SQLAlchemy database models.

```text
user.py
job.py
```

These models represent the database structure and relationships.

---

### `schemas/`

Contains Pydantic schemas used for API request validation and response serialization.

```text
user.py
auth.py
job.py
```

Schemas prevent raw database models from being directly exposed through the API.

---

### `core/`

Contains application-wide configuration and security functionality.

```text
config.py
security.py
dependencies.py
```

Typical responsibilities include:

* Environment configuration
* Password hashing
* JWT creation and validation
* Authentication dependencies
* Current-user resolution

---

### `db/`

Responsible for database configuration.

```text
session.py
base.py
```

This layer manages SQLAlchemy sessions and database model registration.

---

### `alembic/`

Alembic manages database migrations.

Instead of manually modifying the PostgreSQL schema, database structure changes can be version-controlled through migration files.

---

## Frontend Architecture

The frontend is built using React and Vite with a component-based architecture.

### Pages

The `pages/` directory contains route-level screens.

```text
Login
Register
Dashboard
Jobs
Add Job
Edit Job
Not Found
```

---

### Components

Reusable UI components are separated from page-level logic.

Examples include:

```text
Button
Input
Loader
StatCard
DashboardStats
JobCard
JobTable
JobForm
Navbar
Sidebar
```

This reduces duplication and keeps the UI maintainable.

---

### Routes

React Router manages application navigation.

```text
AppRoutes.jsx
ProtectedRoute.jsx
```

Protected routes prevent unauthenticated users from accessing private application pages.

---

### Context

Authentication state is managed through:

```text
AuthContext.jsx
```

This allows authentication information to be accessed across the application without passing it manually through every component.

---

### Services

API communication is separated from UI components.

```text
api.js
authService.js
jobService.js
dashboardService.js
```

The frontend therefore follows:

```text
Component
   ↓
Service
   ↓
Axios
   ↓
FastAPI API
```

rather than placing API requests throughout individual UI components.

---

## Database Design

PostgreSQL is used as the primary relational database.

Phase 1 contains two core entities:

```text
User
  │
  │ 1:N
  │
  ▼
Job
```

A single user can have multiple job applications.

### Users Table

The user entity contains information such as:

```text
id
name
email
password_hash
created_at
```

The email address is unique.

Passwords are stored as secure hashes rather than plain-text passwords.

### Jobs Table

The job entity contains:

```text
id
user_id
company_name
job_title
job_link
location
status
notes
applied_date
created_at
updated_at
```

`user_id` establishes ownership of each job application.

This relationship ensures that job records can be associated with the correct authenticated user.

---

## API Reference

### Authentication

#### Register

```http
POST /auth/register
```

Creates a new user account.

#### Login

```http
POST /auth/login
```

Authenticates the user and returns an authentication token.

#### Current User

```http
GET /auth/me
```

Returns information about the currently authenticated user.

---

### Jobs

#### Get Jobs

```http
GET /jobs
```

Returns the authenticated user's job applications.

#### Get Job

```http
GET /jobs/{id}
```

Returns a specific job application belonging to the authenticated user.

#### Create Job

```http
POST /jobs
```

Creates a new job application.

#### Update Job

```http
PUT /jobs/{id}
```

Updates an existing job application.

#### Delete Job

```http
DELETE /jobs/{id}
```

Deletes an existing job application.

---

### Dashboard

#### Get Dashboard Statistics

```http
GET /dashboard/stats
```

Returns application statistics grouped by status.

The Phase 1 API design includes authentication, job CRUD, and dashboard endpoints.

---

## Example Job Object

```json
{
  "id": "uuid",
  "company_name": "Example Company",
  "job_title": "Software Engineer",
  "job_link": "https://example.com/job",
  "location": "Pune, India",
  "status": "Applied",
  "applied_date": "2026-08-01",
  "notes": "Applied through company career portal"
}
```

---

## Authentication Flow

The authentication process follows:

```text
User
 │
 ▼
Register
 │
 ▼
Password Hashing
 │
 ▼
PostgreSQL
 │
 ▼
Login
 │
 ▼
Credential Validation
 │
 ▼
JWT Token
 │
 ▼
Frontend Authentication State
 │
 ▼
Protected API Requests
```

For protected requests:

```text
Frontend
   ↓
Authorization Token
   ↓
FastAPI
   ↓
JWT Validation
   ↓
Current User
   ↓
User-Owned Data
```

---

## Data Ownership & Security

Security is an important part of the Phase 1 architecture.

The backend does not trust the frontend to determine which user owns a job.

Instead, the authenticated user is resolved from the JWT and database queries are scoped to that user.

Conceptually:

```text
Authenticated User
        ↓
current_user.id
        ↓
Query Jobs
        ↓
WHERE user_id = current_user.id
```

This prevents a user from accessing or modifying another user's job application by manipulating an ID.

Other security principles include:

* Password hashing
* JWT authentication
* Protected API endpoints
* Environment-based configuration
* No hardcoded secrets
* User-scoped database queries
* Input validation through Pydantic

---

## Environment Configuration

The backend requires environment variables for configuration.

Example:

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
CORS_ORIGINS=http://localhost:5173
```

Do not commit real secrets or production credentials to GitHub.

Create a local `.env` file and keep it excluded through `.gitignore`.

A `.env.example` file can be used to document required configuration variables without exposing actual credentials.

---

## Local Development

### Prerequisites

Install the following before running the project:

* Python 3.10+
* Node.js
* npm
* PostgreSQL
* Git

---

## Backend Setup

Clone the repository:

```bash
git clone <your-repository-url>
cd job-tracker
```

Move into the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
CORS_ORIGINS=http://localhost:5173
```

Run database migrations:

```bash
alembic upgrade head
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation can be accessed at:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open another terminal and move into the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Make sure the frontend API configuration points to the running FastAPI backend.

---

## Running the Complete Application

Run both applications simultaneously.

### Terminal 1 — Backend

```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open the frontend development URL in your browser.

---

## Database Migrations

Alembic is used to manage database schema changes.

Create a migration after modifying SQLAlchemy models:

```bash
alembic revision --autogenerate -m "describe migration"
```

Apply migrations:

```bash
alembic upgrade head
```

Rollback the latest migration:

```bash
alembic downgrade -1
```

Database migrations should be committed to Git so that the database schema can be reproduced across development environments.

---

## Development Principles

The project follows several engineering principles.

### Separation of Concerns

Each layer has a specific responsibility.

```text
API
 ↓
Services
 ↓
Repositories
 ↓
Database
```

The frontend follows a similar separation:

```text
Pages
 ↓
Components
 ↓
Services
 ↓
API
```

---

### Single Responsibility

Files and modules should have one primary responsibility.

For example:

```text
auth_service.py
```

handles authentication-related business logic.

```text
job_repository.py
```

handles job database operations.

```text
JobTable.jsx
```

handles presentation of job records.

This makes the codebase easier to understand and maintain.

---

### Reusable Components

Common UI functionality should be implemented once and reused.

Examples:

```text
Button
Input
Loader
JobForm
StatCard
```

This avoids unnecessary duplication across pages.

---

### Database-First Data Ownership

All user-owned resources are associated with a user ID.

The backend is responsible for enforcing ownership rather than relying on frontend restrictions.

---

## Error Handling

The API uses standard HTTP status codes and FastAPI's validation mechanisms.

Typical responses include:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
422 Validation Error
500 Internal Server Error
```

Validation errors are returned by FastAPI/Pydantic and should be handled appropriately by the frontend.

The frontend should provide clear feedback for:

* Invalid login
* Invalid registration data
* Missing required fields
* Failed API requests
* Unauthorized sessions
* Missing job records
* Failed create/update/delete operations

---

## Phase 1 Scope

### Included

* User registration
* User login
* JWT authentication
* Protected routes
* Job application creation
* Job application listing
* Job application editing
* Job application deletion
* Application status management
* Dashboard statistics
* PostgreSQL persistence
* SQLAlchemy ORM
* Alembic migrations
* React frontend
* FastAPI backend
* Responsive UI

### Not Included

Phase 1 intentionally does not include AI automation or advanced job-search automation.

The following belong to future development phases:

* Resume parsing
* AI resume analysis
* Semantic job matching
* RAG
* Embeddings
* Job scraping automation
* Gmail integration
* Automatic application status detection
* AI-generated cover letters
* AI-generated interview questions
* Automated follow-up agents

Phase 1 is intentionally focused on establishing a stable system of record before adding automation.

---

## Current Application Workflow

```text
┌─────────────┐
│   Register  │
└──────┬──────┘
       ↓
┌─────────────┐
│    Login    │
└──────┬──────┘
       ↓
┌─────────────┐
│  Dashboard  │
└──────┬──────┘
       ↓
┌─────────────┐
│   Add Job   │
└──────┬──────┘
       ↓
┌─────────────┐
│  Job List   │
└──────┬──────┘
       ↓
┌────────────────────┐
│ Update / Edit Job  │
└──────┬─────────────┘
       ↓
┌────────────────────┐
│ Dashboard Updates  │
└────────────────────┘
```

---

## Project Milestones

### Milestone 1 — Foundation

Set up:

* React
* Vite
* Tailwind CSS
* FastAPI
* PostgreSQL
* Project architecture

### Milestone 2 — Authentication

Implement:

* Registration
* Login
* JWT authentication
* Protected routes
* User ownership

### Milestone 3 — Job Management

Implement:

* Create job
* Read jobs
* Update job
* Delete job
* Status management

### Milestone 4 — Dashboard

Implement:

* Total application count
* Status-based statistics
* Dashboard UI
* API integration

### Milestone 5 — Testing & Stabilization

Verify:

* Authentication
* CRUD operations
* Database relationships
* API validation
* Protected routes
* User data isolation
* Frontend/backend integration
* Error handling

---

## Definition of Done

Phase 1 is considered complete when a user can:

```text
✓ Register
✓ Login
✓ Access the dashboard
✓ Add a job application
✓ View job applications
✓ Edit a job application
✓ Update application status
✓ Delete a job application
✓ View dashboard statistics
✓ Logout
```

The complete Phase 1 MVP is centered around these core capabilities.

---

## Future Development

The architecture is intentionally designed so that future functionality can be added without rewriting the Phase 1 foundation.

Potential future capabilities include:

```text
Phase 1
   ↓
Reliable Job Tracking
   ↓
Phase 2
   ↓
AI-Powered Job Intelligence
   ↓
Resume Intelligence
   ↓
Semantic Matching
   ↓
Automation
```

The future AI layer can build on the existing job, user, authentication, and dashboard infrastructure rather than replacing it.

---

## Engineering Focus

This project demonstrates practical full-stack engineering concepts including:

* REST API development
* Authentication and authorization
* JWT-based security
* Relational database design
* SQLAlchemy ORM
* Database migrations
* Layered backend architecture
* Repository pattern
* Service layer architecture
* React component architecture
* Protected frontend routes
* API service abstraction
* CRUD operations
* User data isolation
* Frontend/backend integration
* Environment-based configuration

The objective is not simply to build a CRUD application, but to establish a clean foundation that can evolve into a larger production-oriented system.

---

## License

This project is developed for educational and portfolio purposes.

Add the appropriate license here if the repository is released under a specific open-source license.

---

## Author

**Adnan Kakar**

Computer Engineering Student
Backend Engineering | Full-Stack Development

---

⭐ If you find this project useful or interesting, consider starring the repository.
