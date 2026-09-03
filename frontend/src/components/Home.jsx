import { Link } from "react-router-dom";

const categories = [
  "Programming",
  "Finance",
  "Self Help",
  "Productivity",
  "Fiction",
];

const features = [
  {
    id: 1,
    title: "Curated Collection",
    description:
      "Explore carefully selected books across popular categories.",
  },
  {
    id: 2,
    title: "Top-Rated Books",
    description:
      "Discover highly rated books loved by readers.",
  },
  {
    id: 3,
    title: "Simple Search & Filtering",
    description:
      "Quickly find books by title, author, category, or rating.",
  },
];

const Home = () => {
  return (
    <main>
      <section className="flex min-h-[65vh] items-center bg-linear-to-br from-orange-50 via-white to-amber-100 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-semibold uppercase tracking-widest text-orange-600">
            Welcome to BookBazaar
          </p>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Your Next Great Read
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Explore a curated collection of books across
            programming, finance, productivity, self-help,
            and fiction.
          </p>

          <Link
            to="/books"
            className="mt-8 inline-block rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-orange-700 hover:shadow-lg"
          >
            Explore Books
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Browse by Category
          </h2>

          <p className="mt-3 text-gray-600">
            Find books based on what interests you.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-xl border border-orange-100 bg-white p-6 text-center font-semibold text-gray-800 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:text-orange-600 hover:shadow-md"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Why BookBazaar?
            </h2>

            <p className="mt-3 text-gray-400">
              A simple and enjoyable way to discover books.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.id}
                className="rounded-xl border border-gray-700 bg-gray-800 p-7"
              >
                <h3 className="text-xl font-bold text-orange-500">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;