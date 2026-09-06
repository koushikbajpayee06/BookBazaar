# BookBazaar Frontend

BookBazaar is a responsive online bookstore frontend built with React, Vite, Tailwind CSS, React Router, and Redux Toolkit. It was created as a hands-on React learning project focused on reusable components, combined filtering, dynamic routing, global state management, cart persistence, loading states, and error handling.

## Features

- Responsive Home, Books, Book Details, About, Cart, Header, and Footer UI
- Responsive desktop and mobile navigation
- Reusable `BookCard` component
- Local structured book dataset
- Search books by title or author
- Filter books by category
- Toggle top-rated books
- Combine search, category, and rating filters
- Reset all filters
- Empty state when no books match
- Client-side routing with React Router
- Dynamic `/books/:bookId` route
- Responsive two-column book-details layout
- Route-level 404 page
- Dedicated Book Not Found state for invalid IDs
- Reusable shimmer loading interface
- Redux Toolkit shopping cart
- Add a book to the cart
- Merge duplicate books into quantities
- Increase and decrease quantity
- Remove an individual item
- Clear the complete cart
- Display total cart quantity in the header
- Calculate item subtotals and total cart price
- Persist cart state across refreshes with `localStorage`
- Show feedback when a book is added or its quantity is updated

## Tech Stack

- React
- JavaScript
- React Router
- Redux Toolkit
- React Redux
- Tailwind CSS
- Vite

## React Concepts Practised

- Functional components
- Component composition
- Props and object destructuring
- Array methods: `map()`, `find()`, `filter()`, `reduce()`, and `some()`
- Stable React keys
- State management with `useState`
- Side effects and cleanup with `useEffect`
- Controlled form inputs
- Event handling
- Combined filtering logic
- Conditional rendering
- Nested routes with `Outlet`
- Dynamic route parameters with `useParams`
- Route errors with `useRouteError`
- Navigation with `Link`
- Redux slices, actions, and reducers
- Reading global state with `useSelector`
- Dispatching actions with `useDispatch`
- Store setup with `configureStore`
- Store hydration with `preloadedState`
- Store subscriptions and `localStorage` persistence
- Responsive and accessible navigation
- Loading skeletons and toast feedback

## Component Structure

```text
AppLayout
├── Header
├── Outlet
│   ├── Home
│   ├── Body
│   │   ├── Shimmer
│   │   └── BookCard
│   ├── About
│   ├── Cart
│   ├── BookDetails
│   └── ErrorPage
└── Footer
```

## Application Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Home` | Displays the bookstore landing page |
| `/books` | `Body` | Displays and filters the book catalogue |
| `/books/:bookId` | `BookDetails` | Displays one selected book |
| `/about` | `About` | Shows project information |
| `/cart` | `Cart` | Displays cart items, quantities, and totals |
| Unknown route | `ErrorPage` | Displays a route-level 404 page |

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
BookDetails finds the selected book
```

## Combined Filtering

Search text, selected category, and top-rated status are stored separately. A shared `applyFilters()` function applies all active conditions to the original `bookList`, so one filter does not discard the others.

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

Each card links to a route containing its stable ID:

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

## Redux Cart

The Redux store exposes the cart slice under the `cart` key:

```js
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

Components read cart items with `useSelector()` and update the cart by dispatching actions.

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

The total price is derived from cart state:

```js
const totalPrice = cartItems.reduce(
  (total, book) => total + book.price * book.quantity,
  0
);
```

## Cart Persistence

Redux state normally resets after a page reload. BookBazaar stores cart items in `localStorage` whenever the store changes and restores them using `preloadedState`.

```text
Redux cart update
   ↓
store.subscribe()
   ↓
JSON.stringify()
   ↓
localStorage
   ↓
Page reload
   ↓
JSON.parse() and preloadedState
```

## Loading and Error Handling

- A reusable Tailwind shimmer is displayed during the simulated loading state.
- Unknown URLs render the route-level `ErrorPage`.
- A valid book route with an unknown ID renders a dedicated Book Not Found state.
- Add-to-cart actions display short feedback messages.

The simulated loading delay will be replaced with real request state when the frontend is connected to the backend API.

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Body.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Shimmer.jsx
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

Clone the repository:

```bash
git clone git@github.com:koushikbajpayee06/BookBazaar.git
cd BookBazaar/frontend
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The application is usually available at `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Frontend Roadmap

- Replace local `bookList.js` with backend API data
- Replace simulated loading with real API request state
- Add Login and Register screens
- Add an admin book-management dashboard
- Add Create, Edit, and Delete Book forms
- Add checkout and order-history pages
- Add reusable custom hooks where appropriate
- Add automated component and integration tests
- Complete final accessibility and responsive testing
- Deploy the frontend

## Learning Outcomes

Through this frontend, I practised:

- Designing reusable React components
- Passing data through props
- Managing local and global state
- Combining multiple filters safely
- Implementing nested and dynamic routing
- Building a quantity-based Redux cart
- Calculating derived state with `reduce()`
- Persisting Redux state with `localStorage`
- Handling route and resource errors separately
- Creating loading and feedback states
- Building responsive mobile navigation
- Organizing a scalable React project

## Author

**Koushik Bajpayee**

Full-Stack Developer exploring React, Node.js, FastAPI, Generative AI, RAG, and AI Agents.
