import { useState } from "react";
import bookList from "../data/bookList";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

const Body = () => {
  const [books, setBooks] = useState(bookList);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isTopRated, setIsTopRated] = useState(false);

  const applyFilters = (
    query,
    category,
    topRated
  ) => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    const filteredBooks = bookList.filter((book) => {
      const searchMatch =
        book.title
          .toLowerCase()
          .includes(normalizedQuery) ||
        book.author
          .toLowerCase()
          .includes(normalizedQuery);

      const categoryMatch =
        category === "all" ||
        book.category === category;

      const ratingMatch =
        !topRated || book.rating >= 4.7;

      return (
        searchMatch &&
        categoryMatch &&
        ratingMatch
      );
    });

    setBooks(filteredBooks);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    applyFilters(
      searchText,
      selectedCategory,
      isTopRated
    );
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setSelectedCategory(category);

    applyFilters(
      searchText,
      category,
      isTopRated
    );
  };

  const handleTopRatedBooks = () => {
    const nextTopRatedValue = !isTopRated;

    setIsTopRated(nextTopRatedValue);

    applyFilters(
      searchText,
      selectedCategory,
      nextTopRatedValue
    );
  };

  const handleReset = () => {
    setSearchText("");
    setSelectedCategory("all");
    setIsTopRated(false);
    setBooks(bookList);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Explore Our Books
      </h1>
    <div className="mb-8 flex w-full flex-wrap gap-3">
      <input onChange={handleChange}
        value={searchText}
        type="text"
        placeholder="Search by title or author..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
      />

      <button
        type="button"
        onClick={handleSearch}
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
       onChange={ handleCategoryChange}
       className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500">
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
        className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        {isTopRated ? "Show All Ratings" : "Top Books"}
      </button>
    </div>

     {books.length === 0 ? (
        <p className="text-lg font-medium text-red-500">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Link to={`/books/${book.id}`}>
              <BookCard
                key={book.id}
                bookData={book}
              />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};
  


export default Body;