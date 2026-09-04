# BookBazaar

BookBazaar is a responsive online bookstore built with React, Vite, Tailwind CSS, React Router, and Redux Toolkit. It is a hands-on learning project focused on reusable components, state management, combined filtering, dynamic routing, and a quantity-based shopping cart.

## Features

- Responsive header, home page, book grid, details page, cart, and footer
- Reusable `BookCard` component and local structured book dataset
- Search books by title or author
- Filter books by category and toggle top-rated books
- Combined search, category, and rating filters
- Reset filters and display an empty state when no books match
- Client-side navigation with React Router
- Dynamic book-details route using a stable book ID
- Responsive two-column book-details layout
- Add books to the shopping cart
- Merge repeated books into quantity instead of duplicate cards
- Increase and decrease item quantity
- Remove an individual book or clear the entire cart
- Display cart count in the header
- Calculate per-book subtotal and total cart price

## Tech Stack

- React
- JavaScript
- React Router
- Redux Toolkit and React Redux
- Vite
- Tailwind CSS

## React Concepts Practised

- Functional components and component composition
- Props and object destructuring
- Array methods: `map()`, `find()`, `filter()`, and `reduce()`
- Stable React keys
- State management with `useState`
- Controlled form inputs and event handling
- Combined filtering and conditional rendering
- Nested routes with `Outlet`
- Dynamic route parameters with `useParams`
- Navigation with `Link`
- Global state management with Redux Toolkit
- Reading Redux state with `useSelector`
- Dispatching actions with `useDispatch`
- Creating actions and reducers with `createSlice`
- Configuring a Redux store with `configureStore`
- Responsive design with Tailwind CSS

## Component Structure

```text
AppLayout
├── Header
├── Outlet
│   ├── Home
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
| `/` | `Home` | Displays the bookstore landing page |
| `/books` | `Body` | Displays and filters all books |
| `/books/:bookId` | `BookDetails` | Displays one book using its ID |
| `/about` | `About` | Shows information about the project |
| `/cart` | `Cart` | Displays selected books, quantities, and totals |

## Book Data Flow

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

Search text, category, and top-rated status are stored separately. A shared `applyFilters()` function applies all active conditions to the original `bookList`, so selecting one filter does not discard the others.

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

Every book card links to a route containing its stable ID:

```jsx
<Link to={`/books/${book.id}`} key={book.id}>
  <BookCard bookData={book} />
</Link>
```

The details page reads the route parameter and finds the matching book:

```jsx
const { bookId } = useParams();

const book = bookList.find(
  (currentBook) => String(currentBook.id) === bookId
);
```

## Redux Cart Flow

The Redux store exposes the cart slice under the `cart` key:

```js
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

Components read cart items with `useSelector()`:

```js
const cartItems = useSelector(
  (store) => store.cart.items
);
```

The book-details page dispatches the complete book object:

```js
dispatch(addItem(book));
```

If the book already exists, `addItem` increases its quantity. Otherwise, it adds the book with an initial quantity of `1`.

```text
Add to Cart
   ↓
dispatch(addItem(book))
   ↓
cartSlice reducer
   ↓
Add a new book or increase its quantity
   ↓
Header and Cart components re-render
```

The cart supports these actions:

- `addItem`
- `increaseQuantity`
- `decreaseQuantity`
- `removeItem`
- `clearCart`

Cart totals are calculated with `reduce()`:

```js
const totalPrice = cartItems.reduce(
  (total, book) => total + book.price * book.quantity,
  0
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
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   └── router.jsx
│   ├── data/
│   │   └── bookList.js
│   ├── utils/
│   │   ├── appStore.js
│   │   └── cartSlice.js
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

- Persist cart data with `localStorage`
- Add an error page for invalid routes and missing books
- Add shimmer loading
- Add a featured-book label using a Higher-Order Component
- Add reusable custom hooks
- Add theme management with Context API
- Connect a FastAPI backend and database
- Add authentication and authorization
- Replace local book data with backend API data
- Add checkout and order history
- Add unit and integration tests
- Improve mobile navigation and accessibility
- Deploy the frontend and backend

## Learning Goal

BookBazaar reinforces React fundamentals using a stable local dataset before full backend integration. This keeps the focus on component communication, state, filtering, routing, Redux Toolkit, testing, and clean application structure.

## Author

**Koushik Bajpayee**

Full-Stack Developer exploring React, Node.js, Generative AI, RAG, and AI Agents.
