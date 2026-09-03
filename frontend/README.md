# BookBazaar

BookBazaar is a responsive online bookstore built with React, Vite, and Tailwind CSS. It is a hands-on learning project focused on reusable components, state management, combined filtering, dynamic routing, and an upcoming shopping-cart workflow.

## Features

- Responsive header, book grid, details page, and footer
- Reusable `BookCard` component
- Local structured book dataset
- Search by book title or author
- Filter by category
- Toggle top-rated books
- Combined search, category, and rating filters
- Reset all active filters
- Empty state when no books match
- Client-side routing with React Router
- Dynamic book-details route using a stable book ID
- Responsive two-column book-details layout

## Tech Stack

- React
- JavaScript
- React Router
- Vite
- Tailwind CSS

## React Concepts Practised

- Functional components and component composition
- Props and object destructuring
- Rendering arrays with `map()`
- Searching records with `find()`
- Filtering arrays with `filter()`
- Stable React keys
- State management with `useState`
- Controlled inputs
- Event handling
- Combined filtering logic
- Conditional rendering
- Nested routes with `Outlet`
- Dynamic route parameters with `useParams`
- Navigation with `Link`
- Responsive design with Tailwind CSS

## Component Structure

```text
AppLayout
├── Header
├── Outlet
│   ├── Body
│   │   └── BookCard
│   ├── About
│   ├── Cart
│   └── BookDetails
└── Footer
```

## Application Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Body` | Displays and filters all books |
| `/about` | `About` | Shows information about the project |
| `/cart` | `Cart` | Will display selected books |
| `/books/:bookId` | `BookDetails` | Displays one book using its ID |

## Data Flow

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
BookDetails reads bookId and finds the matching book
```

## Combined Filtering

Search text, category, and top-rated status are stored separately. A shared `applyFilters()` function applies all active conditions to the original `bookList`, so selecting one filter does not accidentally discard the others.

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

## Dynamic Book Details

Every card links to a route containing its stable ID:

```jsx
<Link to={`/books/${book.id}`} key={book.id}>
  <BookCard bookData={book} />
</Link>
```

The details page reads the URL parameter and finds the matching book:

```jsx
const { bookId } = useParams();

const book = bookList.find(
  (currentBook) => String(currentBook.id) === bookId
);
```

## Project Structure

```text
book-bazaar/
├── public/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Body.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── data/
│   │   └── bookList.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

```bash
git clone <repository-url>
cd book-bazaar
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## Roadmap

- Add an error page for invalid routes and missing books
- Add a featured-book label using a Higher-Order Component
- Add reusable custom hooks
- Add shimmer loading
- Add theme management with Context API
- Build cart state with Redux Toolkit
- Add quantity controls, remove, clear, and total price
- Connect a FastAPI backend and database
- Add authentication and authorization
- Add unit and integration tests
- Improve mobile navigation
- Deploy the frontend and backend

## Learning Goal

BookBazaar reinforces React fundamentals with a stable local dataset before backend integration. This keeps the focus on component communication, state, filtering, routing, Redux, testing, and clean application structure.

## Author

**Koushik Bajpayee**

Full-Stack Developer exploring React, Node.js, Generative AI, RAG, and AI Agents.
