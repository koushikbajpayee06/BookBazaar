# BookBazaar

BookBazaar is an online bookstore project built with React, Vite, Tailwind CSS, and FastAPI. It combines a responsive book catalogue and Redux-powered cart with a SQLite-backed API for authentication, book management, and role-based access control.

**Current status:** The frontend uses local `bookList.js` data and browser-local cart persistence. The backend supports JWT authentication and Book CRUD with role and ownership checks. Frontend–backend integration, server-side search/filtering, and database-backed cart/order workflows are still planned.

## Features

### Frontend

- Responsive Home, Books, Book Details, About, Cart, Header, and Footer UI
- Reusable `BookCard` and shimmer components
- Search by title or author, category filtering, and a top-rated toggle
- Combined filters, reset controls, and empty-search states
- React Router navigation and dynamic `/books/:bookId` details
- Responsive two-column book details layout
- Redux Toolkit cart: add items, merge repeated items into quantities, increase/decrease quantity, remove items, and clear cart
- Header cart count, per-item subtotals, and total cart price
- Cart persistence across refreshes using `localStorage`
- Route-level error page with `useRouteError` and a separate unknown-book state
- Responsive mobile navigation with an accessible menu toggle
- Add-to-cart and quantity-update toast feedback

### Backend

- FastAPI application with modular API routers
- SQLite database, SQLAlchemy models, and dependency-injected sessions
- User–Book relationship through `created_by_id`
- Pydantic v2 user, token, and book schemas
- Registration with bcrypt password hashing and duplicate-email checks
- Login with signed JWT access tokens and configurable expiry
- Bearer-token verification and protected current-user endpoint
- Reusable `require_roles()` dependency
- Admin-only dashboard test endpoint
- Public book listing and book details endpoints
- Author/admin book creation, with ownership assigned from the authenticated user
- Partial book updates with `exclude_unset=True`
- Ownership checks for book updates and deletion
- Explicit null rejection during PATCH, except for `image_url`
- Book deletion with `204 No Content` and missing-book responses with `404`

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, JavaScript, React Router, Redux Toolkit, React Redux |
| Styling and tooling | Tailwind CSS, Vite, npm |
| Backend | Python, FastAPI, Uvicorn |
| Database | SQLite, SQLAlchemy ORM |
| Validation and configuration | Pydantic v2, pydantic-settings, email-validator |
| Authentication | python-jose, Passlib, bcrypt |
| Python dependency management | uv, pyproject.toml, uv.lock |
| Planned deployment additions | PostgreSQL, Docker, cloud hosting |

## Architecture and Integration Status

The project uses one modular FastAPI backend. Frontend and backend live in separate folders within the same repository.

| Component | Current data source / responsibility |
| --- | --- |
| React catalogue and details | Local `bookList.js` dataset |
| React cart | Redux state, persisted in browser `localStorage` |
| FastAPI authentication | SQLAlchemy User model in SQLite |
| FastAPI Book CRUD | SQLAlchemy Book model in SQLite |
| React-to-FastAPI connection | Planned; requires CORS, API calls, and field mapping |

Frontend search and filters currently operate on local data. They are not yet backed by API query parameters. Browser cart persistence is not an authenticated server-side cart.

## Project Structure

```text
book-bazaar/
  frontend/
    public/
    src/
      components/
        About.jsx
        Body.jsx
        BookCard.jsx
        BookDetails.jsx
        Cart.jsx
        ErrorPage.jsx
        Footer.jsx
        Header.jsx
        Home.jsx
        Shimmer.jsx
        router.jsx
      data/
        bookList.js
      utils/
        appStore.js
        cartSlice.js
      App.jsx
      index.css
      main.jsx
    package.json
    vite.config.js
  backend/
    app/
      api/
        auth.py
        admin.py
        books.py
      core/
        config.py
        dependencies.py
        security.py
      models/
        user.py
        book.py
      schemas/
        user.py
        auth.py
        book.py
      database.py
      main.py
    .gitignore
    .python-version
    pyproject.toml
    uv.lock
    README.md
  README.md
```

The backend `.env`, `.venv`, and SQLite database are local runtime files. Package `__init__.py` files are omitted from this overview.

## Frontend Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Bookstore landing page |
| `/books` | `Body` | Searchable and filterable catalogue |
| `/books/:bookId` | `BookDetails` | Selected book details |
| `/about` | `About` | Project information |
| `/cart` | `Cart` | Items, quantities, subtotals, and total |

## Backend Endpoints

| Method | Endpoint | Access | Behaviour |
| --- | --- | --- | --- |
| GET | `/` | Public | API health message |
| POST | `/api/auth/register` | Public | Create a customer account; `201` |
| POST | `/api/auth/login` | Public | Verify credentials and return a bearer token |
| GET | `/api/auth/me` | Authenticated | Return safe current-user fields |
| GET | `/api/admin/dashboard` | Admin | Demonstrate admin-only access |
| GET | `/api/books/` | Public | Return all books |
| GET | `/api/books/{book_id}` | Public | Return one book or `404` |
| POST | `/api/books/` | Author / Admin | Create a book; `201` |
| PATCH | `/api/books/{book_id}` | Owner Author / Admin | Update supplied fields |
| DELETE | `/api/books/{book_id}` | Owner Author / Admin | Delete a book; `204`, no response body |

Missing, invalid, or expired credentials return `401` on protected routes. A disallowed role or ownership mismatch returns `403`. Duplicate registration emails return `400`.

## Roles and Ownership

| Action | Customer | Author | Admin |
| --- | --- | --- | --- |
| Browse books | Yes | Yes | Yes |
| Create books | No | Yes | Yes |
| Update/delete own books | No | Yes | Yes |
| Update/delete another user's books | No | No | Yes |
| Access admin dashboard endpoint | No | No | Yes |

Public registration always defaults to `customer`; it does not accept a role. Role changes currently use local database administration, not a public role-change endpoint.

`author_name` is the book's writer. `created_by_id` identifies the platform user who added the listing. There is no separate Author database entity. `User.books` and `Book.created_by` provide the two sides of the relationship.

Cart/order permissions and user/order administration remain planned.

## Data Models and Schemas

| Model | Fields |
| --- | --- |
| User | `id`, `name`, `email`, `hashed_password`, `role`, `created_at` |
| Book | `id`, `title`, `author_name`, `description`, `category`, `price`, `rating`, `image_url`, `stock`, `created_by_id`, `created_at` |

User schemas separate registration, login, and output data. `UserOut` excludes passwords and password hashes. `BookCreate` accepts editable book fields; IDs, ownership, and timestamps are assigned by the backend. Rating currently defaults to `0` and is not accepted by create/update schemas.

`BookUpdate` supports partial updates. Only fields explicitly included in a request are applied. Required book fields cannot be explicitly set to `null`; `image_url` can be cleared with `null`.

The current price column uses `Float`. Currency representation and stronger numeric constraints will be reviewed before checkout is implemented. Timestamps are generated in UTC; SQLite does not preserve timezone offsets merely because `DateTime(timezone=True)` is configured.

## Frontend State and Data Flow

The catalogue applies search, category, and rating conditions together to `bookList`. Cards receive book data through props and link to the selected book's details page.

Cart actions dispatch to `cartSlice`, which adds a new item or updates quantities. Header and Cart components select the resulting state. Supported actions include `addItem`, `increaseQuantity`, `decreaseQuantity`, `removeItem`, and `clearCart`.

Total price is derived from item price multiplied by quantity. A store subscription saves cart items to `localStorage`; the application restores them through `preloadedState` after refresh.

The shimmer currently represents frontend loading behaviour. Real network loading and error handling will be added during integration. Field mapping will also be needed, including local `author` versus API `author_name` and frontend route IDs versus integer database IDs.

## Getting Started

### Prerequisites

- Node.js and npm for the frontend
- Python and uv for the backend (developed with Python 3.12)
- Git

### Clone the repository

```bash
git clone https://github.com/koushikbajpayee06/BookBazaar.git
cd BookBazaar
```

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Configure and run the backend

Open a second terminal at the repository root:

```bash
cd backend
uv sync
```

Create `backend/.env` with these values:

```env
SECRET_KEY=replace_with_a_generated_random_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Generate a secret locally and place the output in `SECRET_KEY`:

```bash
uv run python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Start the server from the **backend directory**:

```bash
uv run uvicorn app.main:app --reload
```

- API: `http://127.0.0.1:8000`
- Swagger: `http://127.0.0.1:8000/docs`

The SQLite URL is `sqlite:///./bookbazaar.db`, so its location depends on the working directory. Running from `backend/` also lets configuration find `.env` correctly.

`Base.metadata.create_all()` creates missing tables after model imports. It does not migrate existing table definitions. Database migrations are a future improvement; deleting the database is not a migration strategy.

## Manual API Walkthrough

1. Register with name, email, and password using `/api/auth/register`.
2. Login with the same credentials using `/api/auth/login`.
3. Copy `access_token`, open Swagger's **Authorize**, and paste only the token. HTTPBearer adds the `Bearer` prefix.
4. Call `/api/auth/me` to verify authentication.
5. Use an account assigned `author` or `admin` through local database administration to create a book.

Example create body:

```json
{
  "title": "Atomic Habits",
  "author_name": "James Clear",
  "category": "Self-help",
  "description": "A book about building better habits.",
  "price": 499,
  "image_url": null,
  "stock": 10
}
```

Use the returned ID to retrieve the book. To test PATCH, send only the desired changes:

```json
{
  "price": 449,
  "stock": 15
}
```

For deletion testing, create a disposable book. Successful deletion returns `204`; retrieving its ID afterwards should return `404`.

## Validation Status

Manual development checks have confirmed registration, login, the current-user endpoint, customer rejection from the admin endpoint, admin access, book creation/retrieval, PATCH, and deletion followed by `404`.

The complete author ownership matrix (own book allowed, another author's book denied), invalid-input cases, and automated regression tests remain to be completed. Implemented checks are not presented as a fully tested production security system.

## Local Files and Dependencies

Keep local environments, secrets, databases, and caches out of version control:

```gitignore
node_modules/
dist/
.env
.venv/
*.db
__pycache__/
*.py[cod]
```

Ignore rules do not untrack files already committed. Check staged files before committing. Keep `uv.lock` committed for reproducible dependency installation.

The development setup pinned bcrypt to `4.3.0` to work around a Passlib/bcrypt compatibility failure. Version-metadata warnings and incomplete-package warnings have been observed; dependency/environment cleanup remains outstanding. Stop the server before changing packages on Windows to avoid locked `.pyd` files.

## Learning Outcomes

- Reusable React components, props, destructuring, and stable keys
- Controlled inputs and combined filtering
- Dynamic routing, loading states, and resource-level errors
- Redux actions, selectors, quantity-based cart logic, and derived totals
- Browser persistence with store subscriptions and `localStorage`
- Modular FastAPI routers and dependency injection
- SQLAlchemy models, foreign keys, and bidirectional relationships
- Pydantic v2 request/response schemas and ORM serialization
- Password hashing, JWT authentication, and bearer-token handling
- Role-based authorization and object ownership checks
- Partial updates, explicit null handling, and HTTP status codes

## Roadmap

### Backend and Integration

- [x] Database and User/Book models
- [x] Registration, login, JWT, and current-user endpoint
- [x] Role dependency and admin-only endpoint
- [x] Public book listing and details
- [x] Author/admin book creation
- [x] Book PATCH and DELETE with ownership checks
- [ ] Complete author ownership and invalid-input tests
- [ ] Search by title/author, category and minimum-rating filters
- [ ] Pagination
- [ ] Stronger validation for prices, stock, and text fields
- [ ] Currency representation suitable for checkout
- [ ] CORS configuration and React API integration
- [ ] Database-backed user carts
- [ ] Order placement, stock validation, and transaction handling
- [ ] Own-order history and admin order management
- [ ] Database migrations and PostgreSQL transition

### Frontend

- [ ] Replace local book data with backend API responses
- [ ] Add real request loading/error states and reusable custom hooks
- [ ] Authentication screens and authenticated API requests
- [ ] Author/admin book management forms
- [ ] Checkout and order-history pages
- [ ] Context API theme management
- [ ] Final responsive and accessibility verification

### Quality, Deployment, and Future AI

- [ ] Resolve dependency/environment warnings
- [ ] Backend API and frontend unit/integration tests
- [ ] Docker support and deployment configuration
- [ ] Deploy frontend, backend, and database
- [ ] Explore AI-powered book discovery after the core bookstore is complete

Future AI work may reuse techniques learned in DocuMind AI for semantic discovery over book metadata and descriptions. DocuMind AI remains a separate project.

## Author

**Koushik Bajpayee**

Full-Stack Developer exploring React, Node.js, FastAPI, Generative AI, RAG, and AI Agents.
