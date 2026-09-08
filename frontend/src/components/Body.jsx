import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchBooks } from "../api/books";
import BookCard from "./BookCard";
import Shimmer from "./Shimmer";

const PAGE_SIZE = 12;

const Body = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTopRated, setIsTopRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [request, setRequest] = useState({
    search: "",
    category: "all",
    topRated: false,
    offset: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchBooks({
          ...request,
          limit: PAGE_SIZE,
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setBooks(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || "Could not load books.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadBooks();

    return () => controller.abort();
  }, [request]);

  const applyFilters = (search, category, topRated) => {
    setRequest({
      search,
      category,
      topRated,
      offset: 0,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    applyFilters(searchText, selectedCategory, isTopRated);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    setSelectedCategory(category);
    applyFilters(searchText, category, isTopRated);
  };

  const handleTopRatedBooks = () => {
    const nextValue = !isTopRated;

    setIsTopRated(nextValue);
    applyFilters(searchText, selectedCategory, nextValue);
  };

  const handleReset = () => {
    setSearchText("");
    setSelectedCategory("all");
    setIsTopRated(false);
    applyFilters("", "all", false);
  };

  const changePage = (direction) => {
    setRequest((previous) => ({
      ...previous,
      offset: Math.max(0, previous.offset + direction * PAGE_SIZE),
    }));
  };

  const handleRetry = () => {
    setRequest((previous) => ({ ...previous }));
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Explore Our Books
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex w-full flex-wrap gap-3"
      >
        <input
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
          type="text"
          aria-label="Search by title or author"
          placeholder="Search by title or author..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <button
          type="submit"
          className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Show All
        </button>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="Filter by category"
          className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="all">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Finance">Finance</option>
          <option value="Self Help">Self Help</option>
          <option value="Productivity">Productivity</option>
          <option value="Fiction">Fiction</option>
        </select>

        <button
          type="button"
          onClick={handleTopRatedBooks}
          aria-pressed={isTopRated}
          className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          {isTopRated ? "Show All Ratings" : "Top Books"}
        </button>
      </form>

      {isLoading ? (
        <Shimmer />
      ) : error ? (
        <div role="alert">
          <p className="font-medium text-red-600">{error}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 rounded-lg border border-gray-300 px-4 py-2"
          >
            Try Again
          </button>
        </div>
      ) : books.length === 0 ? (
        <p className="text-lg font-medium text-gray-600">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <BookCard bookData={book} />
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          disabled={isLoading || request.offset === 0}
          onClick={() => changePage(-1)}
          className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {request.offset / PAGE_SIZE + 1}</span>

        <button
          type="button"
          disabled={
            isLoading || Boolean(error) || books.length < PAGE_SIZE
          }
          onClick={() => changePage(1)}
          className="rounded-lg border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Body;