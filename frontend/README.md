# BookBazaar Frontend

Responsive React bookstore frontend built with Vite, Tailwind CSS, React Router, and Redux Toolkit. The book catalogue and details are connected to the FastAPI backend.

## Current Features

- Responsive Home, Books, Book Details, About, Cart, Header, and Footer
- Desktop/mobile navigation and reusable BookCard/Shimmer components
- API-backed listing and book details
- Combined title/author search, category selection, and Top Books filter
- Filter reset, empty results, and Previous/Next pagination
- Real network loading, request error handling, and listing retry
- Resource-level Book Not Found and route-level error UI
- Missing-cover placeholder
- Local Redux cart: add, merge quantities, increase/decrease, remove, and clear
- Header quantity, subtotals, total price, and toast feedback
- Browser cart persistence using localStorage

## Setup

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173/books with the backend running at http://127.0.0.1:8000. Backend setup is documented in [Backend README](../backend/README.md).

`src/api/books.js` currently defines:

```javascript
const BOOKS_API_URL = "http://127.0.0.1:8000/api/books/";
```

Backend CORS permits `http://localhost:5173`. A different port or hostname requires a corresponding CORS change. Environment-based API configuration is a future improvement.

### Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Preview may use a different origin from development; update CORS if testing it against the API.

## Components and Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | Home | Landing page |
| `/books` | Body | API catalogue and controls |
| `/books/:bookId` | BookDetails | API book details |
| `/about` | About | Project information |
| `/cart` | Cart | Local cart and totals |
| Unknown route | ErrorPage | Route-level error UI |

AppLayout provides Header, Outlet, and Footer. Body renders Shimmer and BookCard. The existing `data/bookList.js` may remain for other pages, but Body and BookDetails no longer read it.

## API Integration

| Helper | Endpoint | Responsibility |
| --- | --- | --- |
| `fetchBooks()` | `GET /api/books/` | Query parameters, status checks, and array mapping |
| `fetchBookById()` | `GET /api/books/{book_id}` | Retrieve one book and preserve error status |

Both helpers accept an AbortSignal. Component effects cancel requests on cleanup and ignore aborted results.

Backend fields are mapped to the existing UI shape:

| Backend | Frontend |
| --- | --- |
| `author_name` | `author` |
| `image_url` | `image` |
| Integer `id` | Preserved for links/cart identity |

There is no backend `featured` field. Local sample books are not automatically seeded into the database.

### Listing, Filters, and Pagination

Body stores input controls separately from the active request. Search submission, category/rating changes, and Show All update the request and reset offset to zero. The backend applies all active filters before pagination.

| Parameter | UI behaviour |
| --- | --- |
| `search` | Trimmed title/author search; omitted when empty |
| `category` | Exact selected category; omitted for All Categories |
| `min_rating` | `4.7` when Top Books is active |
| `limit` | Frontend page size of `12` |
| `offset` | Changed by Previous/Next |

The API returns an array without total count. Next is disabled when fewer than 12 books return. An exactly full final page can lead to an empty next page; Previous allows returning. Total-count pagination remains an improvement.

### Book Details

BookDetails reads `bookId` using `useParams()` and calls `fetchBookById()`. It displays Shimmer while loading, Book Not Found after a 404, and a separate message for other request failures. Null/missing images show a cover placeholder. Cards use the database ID and put React's key on the outer Link.

## Redux Cart and Persistence

The cart remains frontend-only. `addItem`, `increaseQuantity`, `decreaseQuantity`, `removeItem`, and `clearCart` update the cart slice. Repeated additions increase quantity. Header and Cart read state with `useSelector()`; components dispatch actions with `useDispatch()`.

Totals are derived from `price * quantity`. Store subscriptions save items to localStorage, and preloaded state restores them after refresh. This is not a user-specific backend cart and does not validate stock or prices with the server.

Previously saved local-data items can have IDs such as `book-101`, while API books use integer IDs. Clear old sample cart entries through the cart UI when checking the API flow.

## Key Files

| Path | Purpose |
| --- | --- |
| `src/api/books.js` | Fetch helpers and field mapping |
| `src/components/Body.jsx` | Listing, filters, pagination, and request state |
| `src/components/BookDetails.jsx` | Details request and add-to-cart UI |
| `src/components/BookCard.jsx` | Book summary and cover fallback |
| `src/components/router.jsx` | Routing |
| `src/utils/appStore.js` | Redux store and persistence |
| `src/utils/cartSlice.js` | Cart actions and reducer |

## Manual Checks

Listing, search, category, Top Books, reset, and details integration have been manually exercised during development. Useful checks include direct details-page refresh, a nonexistent numeric ID, backend-offline error handling, cart quantity changes, and pagination with enough books.

New books default to rating `0`; an empty Top Books result is expected unless qualifying data exists. Automated tests are pending.

## Concepts Practised

- Component composition, props, destructuring, and stable keys
- Controlled inputs and local state with useState
- Effects, dependencies, request cancellation, and cleanup
- Fetch, URLSearchParams, response status handling, and API field mapping
- Server filtering and pagination
- Nested/dynamic routing, Link, useParams, and route errors
- Redux slices, selectors, dispatch, and derived totals
- Store hydration and localStorage persistence
- Loading, empty, resource-error, and feedback states

## Roadmap

- [x] API listing/details and real loading/error states
- [x] Combined server filters and pagination controls
- [x] Missing-image fallback and local cart persistence
- [ ] Login/Register screens, logout, and session handling
- [ ] Authenticated requests and author/admin management UI
- [ ] Backend cart synchronization
- [ ] Checkout and order-history pages
- [ ] Environment-based API URL and richer pagination metadata
- [ ] Review remaining legacy-data consumers
- [ ] Reusable hooks where useful
- [ ] Automated tests, accessibility review, and deployment

## Author

**Koushik Bajpayee** — Full-Stack Developer exploring React, Node.js, FastAPI, Generative AI, RAG, and AI Agents.
