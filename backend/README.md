# BookBazaar Backend

FastAPI backend for BookBazaar, providing JWT authentication, role-based authorization, book CRUD, combined search/filtering, pagination, and SQLite persistence. React book listing and details are integrated through CORS.

## Tech Stack

Python, FastAPI, Uvicorn, SQLite, SQLAlchemy ORM, Pydantic v2, pydantic-settings, python-jose, Passlib/bcrypt, and uv.

## Implemented Features

- User and Book models with foreign-key relationships
- Dependency-injected SQLAlchemy sessions
- Registration, duplicate-email validation, and password hashing
- JWT login and protected current-user endpoint
- Reusable customer/author/admin role checks
- Admin-only dashboard demonstration endpoint
- Public book listing and details
- Author/admin creation, partial updates, and deletion
- Author ownership checks for update/delete; admin access to all books
- Title/author search, exact category filter, and minimum rating
- Ordered offset/limit pagination
- Book text, price, stock, and rating-query validation
- CORS for the local React frontend

## Setup

Run from the repository's backend folder:

```bash
cd backend
uv sync
```

Create `.env` in that folder:

```env
SECRET_KEY=replace_with_a_generated_random_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Generate a secret locally and use its output for SECRET_KEY:

```bash
uv run python -c "import secrets; print(secrets.token_urlsafe(32))"
```

```bash
uv run uvicorn app.main:app --reload
```

API: http://127.0.0.1:8000

Swagger: http://127.0.0.1:8000/docs

The database URL is `sqlite:///./bookbazaar.db`. Run from `backend/` so SQLite and `.env` resolve to their intended locations. Startup imports models and runs `Base.metadata.create_all()` to create missing tables; this does not migrate existing tables.

## Project Files

| Path | Responsibility |
| --- | --- |
| `app/api/auth.py` | Register, login, current user |
| `app/api/admin.py` | Admin-only endpoint |
| `app/api/books.py` | Book CRUD, filters, pagination |
| `app/core/config.py` | Settings loaded from environment |
| `app/core/security.py` | Password hashing/verification and token creation |
| `app/core/dependencies.py` | Current-user resolution and role checks |
| `app/models/user.py`, `app/models/book.py` | SQLAlchemy models |
| `app/schemas/user.py`, `auth.py`, `book.py` | Pydantic request/response schemas |
| `app/database.py` | Engine, Base, SessionLocal, get_db |
| `app/main.py` | App, CORS, routers, table initialization, health |
| `pyproject.toml`, `uv.lock` | Dependencies |

## Endpoints

| Method | Endpoint | Access / result |
| --- | --- | --- |
| GET | `/` | Public health message |
| POST | `/api/auth/register` | Public; customer account, 201 |
| POST | `/api/auth/login` | Public; access_token and token_type |
| GET | `/api/auth/me` | Authenticated; UserOut |
| GET | `/api/admin/dashboard` | Admin only |
| GET | `/api/books/` | Public; BookOut array |
| GET | `/api/books/{book_id}` | Public; BookOut or 404 |
| POST | `/api/books/` | Author/admin; BookOut, 201 |
| PATCH | `/api/books/{book_id}` | Owner author/admin; BookOut |
| DELETE | `/api/books/{book_id}` | Owner author/admin; 204, no body |

Missing/invalid/expired credentials produce 401 on protected routes. Disallowed roles and ownership mismatches produce 403. Duplicate registration email produces 400. Invalid validated inputs produce 422.

### Authentication

Register example:

```json
{
  "name": "Koushik Bajpayee",
  "email": "koushik@example.com",
  "password": "example-password-change-me"
}
```

Login accepts JSON containing `email` and `password`. Copy the returned access_token into Swagger's Authorize dialog without adding the Bearer prefix. HTTP clients send `Authorization: Bearer <access_token>`.

Registration defaults to customer and does not accept a role. Role assignment currently uses local database administration; no public role-change endpoint exists. UserOut excludes passwords and password hashes.

### Roles

| Action | Customer | Author | Admin |
| --- | --- | --- | --- |
| Browse books | Yes | Yes | Yes |
| Create books | No | Yes | Yes |
| Update/delete own books | No | Yes | Yes |
| Update/delete others' books | No | No | Yes |
| Admin dashboard endpoint | No | No | Yes |

Browsing is also available without login. Cart, order, and user-administration permissions are not implemented APIs yet.

### Book Listing Parameters

| Parameter | Default | Behaviour |
| --- | --- | --- |
| `search` | Omitted | Partial title OR author_name match using ilike |
| `category` | Omitted | Exact category match |
| `min_rating` | Omitted | Rating at least this value; range 0–5 |
| `limit` | 10 | Range 1–100 |
| `offset` | 0 | Nonnegative number of rows to skip |

Filters combine with AND; title/author conditions within search combine with OR. Results are ordered by Book.id before offset/limit are applied. Search uses SQL LIKE patterns, so `%` and `_` retain wildcard meaning.

Example:

```text
GET /api/books/?search=james&category=Self%20Help&min_rating=0&limit=12&offset=0
```

The response is an array without a total count or has_next field. React requests 12 books per page. No matches return an empty array.

### Create and Update

```json
{
  "title": "Atomic Habits",
  "author_name": "James Clear",
  "category": "Self Help",
  "description": "A practical guide to building good habits.",
  "price": 499,
  "image_url": null,
  "stock": 10
}
```

The backend assigns ID, created_at, and created_by_id. `author_name` is the writer; created_by_id is the logged-in user adding the listing. User.books and Book.created_by form a bidirectional relationship. There is no separate Author entity.

- Title, author_name, category, and description are stripped of surrounding whitespace and must not be empty.
- Price and stock must be nonnegative. Stock defaults to 0 on creation.
- PATCH uses `model_dump(exclude_unset=True)` to apply only supplied fields.
- Explicit null is rejected by the PATCH route except for image_url, which can be cleared.
- Rating defaults to 0 and is not accepted by create/update schemas.

Example partial update:

```json
{
  "price": 449,
  "stock": 15
}
```

## CORS and Frontend Integration

Current settings allow origin `http://localhost:5173`, methods GET/POST/PATCH/DELETE, and Authorization/Content-Type headers. Credentials are disabled because the current authentication mechanism uses bearer headers rather than cookies.

React listing/details use the API. The client maps author_name/image_url to author/image and uses integer database IDs for navigation. React authentication screens and authenticated book-management forms remain pending.

## Verification and Development Notes

Manual checks include registration/login/current user, customer rejection from the admin endpoint, admin access, CRUD, filter combinations, pagination, invalid rating/price/stock/text inputs, and React listing/details integration. Automated regression tests and comprehensive author ownership cases remain pending.

- SQLite does not preserve timezone offsets merely through DateTime(timezone=True); timestamps are generated in UTC.
- Price uses Float; review currency representation before checkout.
- A fresh database contains no sample books; populate it through an author/admin account.
- Passlib/bcrypt metadata and incomplete-package warnings occurred during development. Dependency/environment cleanup remains pending. Stop the server before changing packages on Windows to avoid locked extension files.
- Keep `.env`, `.venv/`, `*.db`, and `__pycache__/` out of Git. Keep uv.lock committed. Ignore rules do not untrack existing files or erase history.

## Roadmap

- [x] Database, User/Book models, and Pydantic schemas
- [x] Authentication, role dependencies, and ownership checks
- [x] Book CRUD, search, category/rating filters, and pagination
- [x] Text/numeric validation and partial-update null handling
- [x] CORS and React book listing/details integration
- [ ] Backend cart and authenticated frontend cart synchronization
- [ ] Orders, stock validation, transaction handling, and order history
- [ ] Admin user/order management
- [ ] Currency representation and migrations
- [ ] Dependency cleanup and automated tests
- [ ] Deployment configuration and database hosting

See the [root README](../README.md) for overall project status and [Frontend README](../frontend/README.md) for UI integration.
