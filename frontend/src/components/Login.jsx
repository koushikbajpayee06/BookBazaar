import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser, getCurrentUser } from "../api/auth";
import { setCredentials } from "../utils/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const tokenData = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      const user = await getCurrentUser(tokenData.access_token);
        sessionStorage.setItem(
        "bookbazaar_access_token",
        tokenData.access_token
      );

      dispatch(
        setCredentials({
          user,
          accessToken: tokenData.access_token,
        })
      );

      navigate("/books", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200";

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">
          Login
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back to BookBazaar.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <fieldset disabled={isSubmitting} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="font-medium">
                Email
              </label>

              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="username"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="font-medium">
                Password
              </label>

              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </fieldset>

          <p className="text-sm text-gray-600">
            New to BookBazaar?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-600"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;