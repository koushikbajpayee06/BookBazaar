# BookBazaar Backend

FastAPI backend for **BookBazaar**, a full-stack online bookstore platform.

It provides user authentication, JWT-based authorization, role-ready user management, and the database foundation for books, cart, and order workflows.

## Tech Stack

* FastAPI
* Python
* SQLite
* SQLAlchemy ORM
* Pydantic v2
* JWT (`python-jose`)
* bcrypt password hashing
* uv

## Current Features

* SQLite database configuration with SQLAlchemy
* User and Book models with relationships
* User registration with password hashing
* Duplicate email validation
* JWT login endpoint
* Protected current-user endpoint
* Role-ready user model: `customer`, `author`, `admin`
* Swagger API documentation

## Project Structure

```text
backend/
├── app/
│   ├── api/
│   │   └── auth.py
│   ├── core/
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── security.py
│   ├── models/
│   │   ├── book.py
│   │   └── user.py
│   ├── schemas/
│   │   ├── auth.py
│   │   └── user.py
│   ├── database.py
│   └── main.py
├── .env
├── .gitignore
├── pyproject.toml
└── uv.lock
```

## Setup

Install dependencies:

```bash
uv sync
```

Create a `.env` file inside the `backend` folder:

```env
SECRET_KEY=your_long_random_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Run the development server:

```bash
uv run uvicorn app.main:app --reload
```

Open Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

## Authentication API

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| `POST` | `/api/auth/register` | Register a new user                  |
| `POST` | `/api/auth/login`    | Login and receive a JWT access token |
| `GET`  | `/api/auth/me`       | Get the currently logged-in user     |

### Register Example

```json
{
  "name": "Koushik Bajpayee",
  "email": "koushik@example.com",
  "password": "securepassword123"
}
```

### Login Example

```json
{
  "email": "koushik@example.com",
  "password": "securepassword123"
}
```

After login, use the received access token in Swagger's **Authorize** button to access protected endpoints.

## User Roles

| Role       | Permissions                                 |
| ---------- | ------------------------------------------- |
| `customer` | Browse books, manage cart, and place orders |
| `author`   | Add and manage their own books              |
| `admin`    | Manage all books, users, and orders         |

Newly registered users receive the `customer` role by default.

## Security

* Passwords are hashed with bcrypt before storage.
* Plain-text passwords are never returned in API responses.
* JWT tokens are used to identify authenticated users.
* The `.env` file and SQLite database are excluded from Git.

## Roadmap

* [ ] Role-based permission dependencies
* [ ] Book CRUD APIs
* [ ] Search, category, and rating filters
* [ ] Author ownership checks
* [ ] Cart APIs
* [ ] Order APIs
* [ ] CORS configuration
* [ ] React frontend integration
* [ ] Tests and deployment
