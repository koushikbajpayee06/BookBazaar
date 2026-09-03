const Footer = () => {
  return (
    <footer className="mt-12 bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-8 text-center">
        <h2 className="text-xl font-bold text-orange-500">
          BookBazaar
        </h2>

        <p className="text-sm text-gray-300">
          Discover your next great read.
        </p>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} BookBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;