import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  Link,
  useParams,
} from "react-router-dom";

import bookList from "../data/bookList";
import { addItem } from "../utils/cartSlice";

const BookDetails = () => {
  const { bookId } = useParams();

  const [toastMessage, setToastMessage] =
    useState("");

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (store) => store.cart.items
  );

  const book = bookList.find(
    (currentBook) =>
      String(currentBook.id) === bookId
  );

  if (!book) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
          <p className="text-6xl">📚</p>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Book Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The requested book does not exist
            or may have been removed.
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
    const alreadyInCart = cartItems.some(
      (item) => item.id === book.id
    );

    dispatch(addItem(book));

    setToastMessage(
      alreadyInCart
        ? "Book quantity updated!"
        : "Book added to cart!"
    );

    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  const {
    title,
    author,
    category,
    price,
    rating,
    image,
    description,
  } = book;

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
            <img
              src={image}
              alt={title}
              className="max-h-150 w-full rounded-xl object-cover shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-semibold text-orange-600">
              {category}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              {title}
            </h1>

            <p className="mt-3 text-lg text-gray-600">
              By {author}
            </p>

            <p className="mt-4 font-semibold text-green-600">
              ⭐ {rating}
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              {description}
            </p>

            <p className="mt-6 text-2xl font-bold text-orange-600">
              ₹{price}
            </p>

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