import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const cartItems = useSelector(
    (store) => store.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-orange-600"
        >
          BookBazaar
        </Link>

        <button
          type="button"
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="rounded-lg p-2 text-2xl text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute left-0 top-full w-full border-t border-gray-200 bg-white shadow-md md:static md:block md:w-auto md:border-0 md:shadow-none`}
        >
          <ul className="flex flex-col px-6 py-4 md:flex-row md:items-center md:gap-6 md:p-0">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-3 text-gray-700 transition hover:text-orange-600 md:py-0"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/books"
                onClick={closeMenu}
                className="block py-3 text-gray-700 transition hover:text-orange-600 md:py-0"
              >
                Books
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block py-3 text-gray-700 transition hover:text-orange-600 md:py-0"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                onClick={closeMenu}
                className="block py-3 text-gray-700 transition hover:text-orange-600 md:py-0"
              >
                Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;