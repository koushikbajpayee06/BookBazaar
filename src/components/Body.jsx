import { useState } from "react";
import bookList from "../data/bookList";
import BookCard from "./BookCard";
import { useEffect } from "react";

const Body = () => {
  const [books, setBooks] = useState(bookList)
  const [searchText, setSearchText] = useState("");

  const handleChange = (e)=>{
    setSearchText(e.target.value)
  }
  const handleClick = ()=>{
    const filterBooks = bookList.filter((books)=>{
      return(
        books.title.toLowerCase().includes(searchText.toLowerCase()) ||
        books.author.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setBooks(filterBooks)
  }
  const handleReset = () => {
    setSearchText("");
    setBooks(bookList);
  };
  useEffect(() => {
    setBooks(bookList)
  }, [])
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Explore Our Books
      </h1>
    <div className="mb-8 flex w-full max-w-2xl gap-3">
      <input onChange={handleChange}
        value={searchText}
        type="text"
        placeholder="Search by title or author..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
      />

      <button
        type="button"
        onClick={handleClick}
        className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        Search
      </button>
    </div>

     {books.length === 0 ? (
        <p className="text-lg font-medium text-red-500">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              bookData={book}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Body;