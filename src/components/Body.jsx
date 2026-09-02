import bookList from "../data/bookList";
import BookCard from "./BookCard";

const Body = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Explore Our Books
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookList.map((book) => (
          <BookCard
            key={book.id}
            bookData={book}
          />
        ))}
      </div>
    </main>
  );
};

export default Body;