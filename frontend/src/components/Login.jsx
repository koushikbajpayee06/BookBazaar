import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-3xl font-bold">Login</h1>

      <p className="mt-4">
        New to BookBazaar?{" "}
        <Link to="/register" className="text-orange-600">
          Create an account
        </Link>
      </p>
    </main>
  );
};

export default Login;