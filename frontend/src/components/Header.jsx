import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header  className=" bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">BookBazaar</h1>
        <nav className="cursor-pointer text-gray-700 transition-colors hover:text-orange-600">
          <ul className="flex items-center gap-6">
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer"><Link to="/books">Books</Link></li>
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer"><Link to="/about">About</Link></li>
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer"><Link to="/cart">Cart (0)</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;