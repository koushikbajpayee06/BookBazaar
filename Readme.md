# BookBazaar

BookBazaar is a full-stack online bookstore built with React and FastAPI. The project combines a responsive bookstore interface, dynamic book discovery, Redux-powered cart management, database-backed book and user models, and an authentication foundation.

The application is being developed as a hands-on learning project focused on frontend architecture, API development, database integration, authentication, authorization, state management, and production-ready full-stack workflows.

## Current Status

### Frontend — Completed

- Responsive Home, Books, Book Details, About, Cart, Header, and Footer UI
- Reusable `BookCard` component
- Local structured book dataset
- Search books by title or author
- Filter books by category
- Toggle top-rated books
- Combined search, category, and rating filters
- Reset filters and empty-search state
- Client-side routing with React Router
- Dynamic route: `/books/:bookId`
- Responsive two-column book-details layout
- Redux Toolkit cart state
- Add books to cart
- Merge repeated books into quantities
- Increase and decrease quantities
- Remove individual items
- Clear the complete cart
- Header cart count
- Per-item subtotal and total cart price

### Backend — Foundation Completed

- FastAPI application setup
- SQLite database configuration with SQLAlchemy
- Dependency-injected database sessions
- Database table creation during application startup
- User database model
- Book database model
- User-to-book relationship
- Pydantic v2 user schemas
- Password hashing utility
- User registration endpoint
- Duplicate-email validation
- Default customer role
- Role and permission dependency foundation
- API health response

## Tech Stack

### Frontend

- React
- JavaScript
- React Router
- Redux Toolkit
- React Redux
- Tailwind CSS
- Vite

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic v2
- SQLite
- Passlib / bcrypt
- Uvicorn
- uv

### Planned Production Stack

- PostgreSQL
- JWT authentication
- Docker
- Cloud deployment

## Architecture

```text
React Frontend
     │
     │ HTTP / JSON
     ▼
FastAPI Backend
     │
     ▼
SQLAlchemy ORM
     │
     ▼
SQLite Database
```

## Project Structure

```text
book-bazaar/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Body.jsx
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   └── router.jsx
│   │   ├── data/
│   │   │   └── bookList.js
│   │   ├── utils/
│   │   │   ├── appStore.js
│   │   │   └── cartSlice.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   ├── book.py
│   │   │   └── user.py
│   │   ├── routers/
│   │   │   └── auth.py
│   │   ├── schemas/
│   │   │   └── user.py
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   ├── main.py
│   │   └── security.py
│   ├── tests/
│   ├── .env.example
│   ├── pyproject.toml
│   └── uv.lock
├── .gitignore
└── README.md
```

> The exact backend package layout may evolve as book, cart, and order modules are added.

## Frontend Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Bookstore landing page |
| `/books` | `Body` | Searchable and filterable book catalogue |
| `/books/:bookId` | `BookDetails` | Details for one selected book |
| `/about` | `About` | Project information |
| `/cart` | `Cart` | Cart items, quantities, subtotals, and total |

## Implemented Backend Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Check whether the backend is running |
| `POST` | `/api/auth/register` | Create a user account with a hashed password |

Additional authentication, book, cart, and order endpoints are planned.

## Frontend Data Flow

```text
bookList
   ↓
Body state and combined filters
   ↓
books.map()
   ↓
BookCard receives bookData through props
   ↓
Card links to /books/:bookId
   ↓
BookDetails finds the selected book
```

## Combined Filtering

Search text, selected category, and top-rated status are stored separately. A shared filter function applies all active conditions to the original dataset.

```jsx
const filteredBooks = bookList.filter((book) => {
  const searchMatch =
    book.title.toLowerCase().includes(normalizedQuery) ||
    book.author.toLowerCase().includes(normalizedQuery);

  const categoryMatch =
    category === "all" || book.category === category;

  const ratingMatch = !topRated || book.rating >= 4.7;

  return searchMatch && categoryMatch && ratingMatch;
});
```

## Redux Cart Flow

```text
Add to Cart
   ↓
dispatch(addItem(book))
   ↓
cartSlice reducer
   ↓
Add a new item or increase its quantity
   ↓
Header and Cart re-render
```

The cart supports:

- `addItem`
- `increaseQuantity`
- `decreaseQuantity`
- `removeItem`
- `clearCart`

The total price is derived from Redux state:

```js
const totalPrice = cartItems.reduce(
  (total, book) => total + book.price * book.quantity,
  0
);
```

## Backend Data Models

### User

- `id`
- `name`
- `email`
- `hashed_password`
- `role`
- `created_at`

The default role is `customer`.

### Book

- `id`
- `title`
- `author_name`
- `description`
- `category`
- `price`
- `rating`
- `image_url`
- `stock`
- `created_by_id`
- `created_at`

Each book is connected to the user who created it through a SQLAlchemy relationship.

## Roles and Permissions

The planned authorization model is:

| Role | Permissions |
| --- | --- |
| `customer` | Browse books, manage personal cart, and place orders |
| `admin` | Create, update, and delete books; manage catalogue data |

Reusable FastAPI dependencies will protect role-specific endpoints and return `403 Forbidden` when a user lacks permission.

## Getting Started

### Clone the repository

```bash
git clone git@github.com:koushikbajpayee06/BookBazaar.git
cd BookBazaar
```

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend is usually available at `http://localhost:5173`.

### Run the backend

Open a second terminal from the repository root:

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload
```

The backend is usually available at `http://127.0.0.1:8000`.

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

## Environment and Generated Files

Do not commit local environments, database files, secrets, or generated caches:

```gitignore
node_modules/
dist/
.env
.venv/
*.db
__pycache__/
*.py[cod]
```

## Learning Outcomes

This project currently demonstrates:

- Component composition and reusable React UI
- Props, destructuring, and stable keys
- Controlled inputs and combined filtering
- Dynamic and nested routing
- Global state management with Redux Toolkit
- Action dispatching and state selection
- Quantity-based cart logic and derived totals
- FastAPI project organization
- SQLAlchemy models and relationships
- Pydantic request and response schemas
- Dependency-injected database sessions
- Password hashing and user registration
- Foundations of role-based authorization

## Roadmap

### Frontend

- Persist cart state with `localStorage`
- Add route-level error UI and shimmer loading
- Add reusable custom hooks
- Add Context API theme management
- Replace `bookList.js` with backend API data
- Add authentication screens
- Add checkout and order-history pages
- Improve mobile navigation and accessibility

### Backend

- Complete current-user authentication
- Implement login and JWT access tokens
- Complete role-based authorization dependencies
- Implement book CRUD endpoints
- Add book search, category, rating, and pagination filters
- Add database-backed cart endpoints
- Add checkout and order endpoints
- Add stock validation
- Add consistent validation and error responses
- Migrate from SQLite to PostgreSQL for production

### Quality and Deployment

- Add frontend unit and integration tests
- Add backend API tests
- Add Docker support
- Configure production environment variables
- Deploy frontend, backend, and database

## Author

**Koushik Bajpayee**

Full-Stack Developer exploring React, Node.js, FastAPI, Generative AI, RAG, and AI Agents.
