import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
        <p className="text-7xl font-bold text-orange-600">
          {error?.status || 404}
        </p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          {error?.statusText ||
            error?.message ||
            "The page you are looking for does not exist."}
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;