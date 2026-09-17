import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getCurrentUser } from "./api/auth";
import {
  setCredentials,
  clearCredentials,
} from "./utils/authSlice";

const TOKEN_KEY = "bookbazaar_access_token";

const AppLayout = () => {
  const dispatch = useDispatch();

  const [sessionStatus, setSessionStatus] = useState("checking");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const token = sessionStorage.getItem(TOKEN_KEY);

        if (!token) {
          if (!cancelled) {
            dispatch(clearCredentials());
            setSessionStatus("ready");
          }
          return;
        }

        const user = await getCurrentUser(token);

        if (cancelled) return;

        dispatch(
          setCredentials({
            user,
            accessToken: token,
          })
        );

        setSessionStatus("ready");
      } catch (error) {
        if (cancelled) return;

        if (error.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY);
          dispatch(clearCredentials());
          setSessionStatus("ready");
        } else {
          setSessionStatus("error");
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [dispatch, retryCount]);

  const handleRetry = () => {
    setSessionStatus("checking");
    setRetryCount((previous) => previous + 1);
  };

  const handleContinueLoggedOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    dispatch(clearCredentials());
    setSessionStatus("ready");
  };

  if (sessionStatus === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p role="status" className="text-gray-600">
          Checking your session...
        </p>
      </main>
    );
  }

  if (sessionStatus === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="max-w-md rounded-xl bg-white p-6 shadow-md">
          <p role="alert" className="text-red-600">
            Could not check your session. Please try again.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-lg bg-orange-600 px-4 py-2 text-white"
            >
              Retry
            </button>

            <button
              type="button"
              onClick={handleContinueLoggedOut}
              className="rounded-lg border border-gray-300 px-4 py-2"
            >
              Continue logged out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;