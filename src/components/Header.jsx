const Header = () => {
  return (
    <header  className=" bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">BookBazaar</h1>
        <nav className="cursor-pointer text-gray-700 transition-colors hover:text-orange-600">
          <ul className="flex items-center gap-6">
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer">Home</li>
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer">Books</li>
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer">About</li>
            <li className="text-gray-700 hover:text-orange-600 cursor-pointer">Cart (0)</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;