# BookBazaar

BookBazaar is a responsive online bookstore interface built with React, Vite, and Tailwind CSS. The project is being developed as a hands-on React learning project, with a focus on reusable components, state management, search, filtering, routing, and cart functionality.

## Current Features

- Responsive header, book listing, and footer
- Reusable `BookCard` component
- Local structured book dataset
- Responsive card grid using Tailwind CSS
- Search books by title or author
- Filter books by category
- Show top-rated books
- Reset filters and display all books
- Empty-state message when no books match

## Tech Stack

- React
- JavaScript
- Vite
- Tailwind CSS

## React Concepts Practised

- Functional components
- Component composition
- Props
- Object destructuring
- Array rendering with `map()`
- Stable React keys
- State management with `useState`
- Controlled form inputs
- Event handling with `onChange` and `onClick`
- Array filtering with `filter()`
- Conditional rendering
- State-driven UI updates
- Responsive UI design with Tailwind CSS

## Component Structure

```text
App
├── Header
├── Body
│   └── BookCard
└── Footer
```

## Data Flow

```text
bookList
   ↓
Body component state
   ↓
Search and filter operations
   ↓
books.map()
   ↓
BookCard receives bookData through props
   ↓
Book information rendered in the UI
```

## Search Flow

```text
User enters a title or author
   ↓
onChange updates searchText
   ↓
Search button triggers filter()
   ↓
Matching books are passed to setBooks()
   ↓
React re-renders the book grid
```

## Project Structure

```text
book-bazaar/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Body.jsx
│   │   ├── BookCard.jsx
│   │   └── Footer.jsx
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

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd book-bazaar
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Book Rendering

Books are stored as an array of objects and rendered dynamically:

```jsx
{books.map((book) => (
  <BookCard
    key={book.id}
    bookData={book}
  />
))}
```

The stable book ID is used as the React key, while the complete book object is passed through the `bookData` prop.

## Search and Filtering

The original dataset remains unchanged in `bookList`. The `books` state controls which books are currently displayed:

```jsx
const [books, setBooks] = useState(bookList);
const [searchText, setSearchText] = useState("");
const [selectedCategory, setSelectedCategory] = useState("all");
```

Search checks both the title and author using case-insensitive matching. Category and rating filters create new arrays and update the displayed state with `setBooks()`.

## Roadmap

- Combine search, category, and rating filters
- Add React Router
- Add a dynamic book details page
- Add featured-book labels using a Higher-Order Component
- Create reusable custom hooks
- Add shimmer loading and an error page
- Add theme management with Context API
- Add a cart using Redux Toolkit
- Support cart quantity, remove, clear, and total price
- Add unit and integration tests
- Improve mobile navigation
- Deploy the application

## Learning Goal

The goal of BookBazaar is to reinforce React fundamentals by building each feature independently instead of relying on an unstable third-party API. The project keeps data under local control so the focus remains on React architecture, component communication, state, routing, Redux, and testing.

## Author

**Koushik Bajpayee**

Full-Stack Developer exploring React, Node.js, Generative AI, RAG, and AI Agents.
