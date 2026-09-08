import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { addItem } from "../utils/cartSlice";
import { fetchBookById } from "../api/books";
import Shimmer from "./Shimmer";

const BookDetails = () => {
  const { bookId } = useParams();

  const [toastMessage, setToastMessage] = useState("");

  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBook() {
      setIsLoading(true);
      setError(null);
      setBook(null);

      try {
        const data = await fetchBookById(bookId, {
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setBook(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadBook();

    return () => controller.abort();
  }, [bookId]);

  if (isLoading) {
    return <Shimmer />;
  }

  if (error && error.status !== 404) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <p role="alert" className="text-red-600">
          {error.message}
        </p>

        <Link to="/books" className="mt-4 inline-block text-orange-600">
          Back to Books
        </Link>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
          <p className="text-6xl">📚</p>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Book Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The requested book does not exist or may have been removed.
          </p>

          <Link
            to="/books"
            className="mt-7 inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  const handleAddItem = () => {
    const alreadyInCart = cartItems.some((item) => item.id === book.id);

    dispatch(addItem(book));

    setToastMessage(
      alreadyInCart ? "Book quantity updated!" : "Book added to cart!",
    );

    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  const { title, author, category, price, rating, image, description } = book;

  return (
    <>
      {toastMessage && (
        <div className="fixed right-5 top-24 z-50 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            {image ? (
              <img
                src={image}
                alt={title}
                className="max-h-150 w-full rounded-xl object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-96 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                No cover available
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-semibold text-orange-600">{category}</p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">{title}</h1>

            <p className="mt-3 text-lg text-gray-600">By {author}</p>

            <p className="mt-4 font-semibold text-green-600">⭐ {rating}</p>

            <p className="mt-6 leading-7 text-gray-600">{description}</p>

            <p className="mt-6 text-2xl font-bold text-orange-600">₹{price}</p>

            <button
              type="button"
              onClick={handleAddItem}
              className="mt-8 w-fit rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookDetails;
