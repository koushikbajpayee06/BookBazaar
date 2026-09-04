import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector(
    (store) => store.cart.items
  );

  const dispatch = useDispatch();

  const totalItems = cartItems.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, book) =>
      total + book.price * book.quantity,
    0
  );

  return (
    <main className="mx-auto min-h-[70vh] max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({totalItems})
        </h1>

        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-medium text-gray-500">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {cartItems.map((book) => (
              <div
                key={book.id}
                className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-44 w-full rounded-lg object-cover sm:w-32"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {book.title}
                  </h2>

                  <p className="mt-1 text-gray-600">
                    By {book.author}
                  </p>

                  <p className="mt-3 font-semibold text-orange-600">
                    ₹{book.price} × {book.quantity}
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    Subtotal: ₹
                    {book.price * book.quantity}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(decreaseQuantity(book.id))
                    }
                    className="h-10 w-10 rounded-lg bg-gray-200 text-xl font-bold text-gray-700 hover:bg-gray-300"
                  >
                    −
                  </button>

                  <span className="min-w-8 text-center text-lg font-bold">
                    {book.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(increaseQuantity(book.id))
                    }
                    className="h-10 w-10 rounded-lg bg-orange-600 text-xl font-bold text-white hover:bg-orange-700"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(removeItem(book.id))
                    }
                    className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 text-right shadow-md">
            <p className="text-gray-600">
              Total items: {totalItems}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Total: ₹{totalPrice}
            </h2>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;