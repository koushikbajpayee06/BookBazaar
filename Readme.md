# BookBazaar

BookBazaar is a full-stack online bookstore built with React, Vite, Tailwind CSS, and FastAPI. It combines an API-backed book catalogue with JWT authentication, role-based book management, and a browser-persisted Redux cart.

## Current Status

Book listing and details now load from the FastAPI backend. Search, category and minimum-rating filters, pagination, and request loading/error states are integrated into the React catalogue.

Backend authentication and book permissions are implemented. Frontend login/register screens, author/admin management screens, database-backed carts, and orders are still planned. The existing cart uses Redux and `localStorage`.

## Features

### Frontend

- Responsive Home, Books, Book Details, About, Cart, Header, and Footer
- API-backed catalogue and dynamic `/books/:bookId` details
- Combined title/author search, category filtering, and Top Books toggle
- Previous/Next pagination, filter reset, and empty states
- Real request loading with Shimmer and listing retry after errors
- Separate request-error, unknown-book, and route-error states
- Cover placeholder when a book has no image
- Redux cart with add, quantity changes, remove, clear, header count, and totals
- Cart persistence through `localStorage` and add-to-cart feedback

### Backend

- Modular FastAPI routers and SQLAlchemy sessions
- SQLite User and Book models with relationships
- Pydantic v2 request/response schemas
- Registration, duplicate-email checks, bcrypt password hashing, and JWT login
- Protected current-user endpoint and reusable role dependency
- Public book listing/details and author/admin book creation
- Partial updates and deletion with author ownership checks
- Search, category and rating filters, and offset/limit pagination
- Nonnegative price/stock and nonempty, whitespace-trimmed text validation
- CORS for the local React frontend

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, JavaScript, React Router, Redux Toolkit, React Redux |
| Styling/tooling | Tailwind CSS, Vite, npm |
| Backend | Python, FastAPI, Uvicorn |
| Database | SQLite, SQLAlchemy ORM |
| Validation/configuration | Pydantic v2, pydantic-settings, email-validator |
| Authentication | python-jose, Passlib, bcrypt |
| Python dependencies | uv, pyproject.toml, uv.lock |

## Repository and Documentation

The frontend and one modular backend live in the same repository; this is not a microservices deployment.

| Path | Responsibility |
| --- | --- |
| `frontend/src/api/books.js` | Book API requests and field mapping |
| `frontend/src/components/` | Pages and reusable UI |
| `frontend/src/utils/` | Redux store and cart slice |
| `frontend/src/data/bookList.js` | Legacy local dataset; no longer used by listing/details |
| `backend/app/api/` | Auth, admin, and book routes |
| `backend/app/core/` | Settings, security, and dependencies |
| `backend/app/models/` | SQLAlchemy User and Book models |
| `backend/app/schemas/` | Pydantic schemas |
| `backend/app/database.py` | Database engine and session dependency |

See [Frontend README](frontend/README.md) and [Backend README](backend/README.md) for implementation details.

## Data and Integration

| Feature | Current source |
| --- | --- |
| Catalogue and book details | FastAPI and SQLite |
| Search, filters, pagination | Backend query parameters |
| Cart | Redux and browser localStorage |
| Authentication | Backend API; frontend integration pending |

The frontend API helper maps `author_name` to `author` and `image_url` to `image`. Links use database IDs. Local sample books are not automatically imported into SQLite. Other pages using the legacy dataset require a separate review.

The backend defaults to 10 results per request; the frontend requests 12. The list response is an array without a total count. If the last page contains exactly 12 books, Next can lead to an empty page; Previous remains available.

## Routes and Access

Frontend routes: `/`, `/books`, `/books/:bookId`, `/about`, and `/cart`.

| Method | API endpoint | Access |
| --- | --- | --- |
| GET | `/` | Public health check |
| POST | `/api/auth/register` | Public; creates customer |
| POST | `/api/auth/login` | Public; returns access token |
| GET | `/api/auth/me` | Authenticated |
| GET | `/api/admin/dashboard` | Admin |
| GET | `/api/books/` | Public; filtered/paginated listing |
| GET | `/api/books/{book_id}` | Public |
| POST | `/api/books/` | Author or admin |
| PATCH | `/api/books/{book_id}` | Author owning the book, or admin |
| DELETE | `/api/books/{book_id}` | Author owning the book, or admin |

Public registration does not accept a role. Role assignment currently uses local database administration. User/order administration APIs are not implemented.

`author_name` names the writer; `created_by_id` identifies the platform user who added the listing. There is no separate Author model.

## Getting Started

Prerequisites: Git, Node.js/npm, and Python/uv. Backend development uses Python 3.12.

```bash
git clone https://github.com/koushikbajpayee06/BookBazaar.git
cd BookBazaar
```

### Backend

```bash
cd backend
uv sync
```

Create `backend/.env`:

```env
SECRET_KEY=replace_with_a_generated_random_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Generate a secret locally:

```bash
uv run python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Run from the backend directory:

```bash
uv run uvicorn app.main:app --reload
```

API: http://127.0.0.1:8000 — Swagger: http://127.0.0.1:8000/docs

### Frontend

In a second terminal, from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173/books. The current API base URL is configured directly in `frontend/src/api/books.js`. CORS allows `http://localhost:5173`; if the frontend origin changes, update backend CORS accordingly.

A new database has no books. Register/login in Swagger, use a locally assigned author/admin account, and create books through the API to populate the catalogue.

## Verification and Limitations

Manual development checks cover authentication, admin access checks, book CRUD, filters, pagination, text/numeric validation, and frontend listing/details flows. Automated regression tests and the complete author ownership test matrix remain pending.

- Ratings default to `0`; book create/update schemas do not accept a rating. Top Books filters at `4.7`, so newly created books will not appear there.
- Price currently uses `Float`; checkout requires a review of currency representation.
- SQLite uses `sqlite:///./bookbazaar.db`; run from `backend/` to use the intended database.
- `create_all()` creates missing tables but does not migrate existing tables.
- Dependency/environment warnings involving Passlib/bcrypt were observed during development; cleanup remains pending.
- Ignore secrets, environments, databases, caches, and generated dependencies. Ignore rules do not remove previously tracked files or repository history.

## Roadmap

- [x] User/Book models and schemas
- [x] Registration, JWT login, current user, roles, and book ownership checks
- [x] Book CRUD, combined filters, pagination, and book input validation
- [x] CORS and React listing/details integration
- [x] Real loading/error states and missing-cover fallback
- [x] Local Redux cart and persistence
- [ ] Frontend register/login, logout, and session handling
- [ ] Author/admin book-management forms
- [ ] Database-backed cart and frontend synchronization
- [ ] Checkout, orders, stock validation, and transaction handling
- [ ] Order history and admin order management
- [ ] Currency representation and database migrations
- [ ] Dependency cleanup and automated tests
- [ ] Responsive/accessibility verification and deployment
- [ ] Explore AI book discovery after the core bookstore is complete

DocuMind AI remains a separate project; its techniques may inform future semantic book discovery.

## Author

**Koushik Bajpayee** — Full-Stack Developer exploring React, Node.js, FastAPI, Generative AI, RAG, and AI Agents.
