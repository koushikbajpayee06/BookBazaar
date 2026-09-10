import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

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

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setForm({ name: "", email: "", password: "" });
      setIsRegistered(true);
    } catch (err) {
      setError(err.message || "Could not create your account.");
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
          Create an account
        </h1>

        {isRegistered ? (
          <div className="mt-6">
            <p role="status" className="text-green-700">
              Account created successfully! You can now log in.
            </p>

            <Link
              to="/login"
              className="mt-5 inline-block rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <fieldset disabled={isSubmitting} className="space-y-5">
              <div>
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
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
                {isSubmitting ? "Creating account..." : "Register"}
              </button>
            </fieldset>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-orange-600">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
};


export default Register;