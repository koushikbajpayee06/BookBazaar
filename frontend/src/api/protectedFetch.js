import appStore from "../utils/appStore";
import { clearCredentials } from "../utils/authSlice";

const API_BASE_URL = "http://127.0.0.1:8000";
const TOKEN_KEY = "bookbazaar_access_token";

export async function protectedFetch(path, options = {}) {
  const token = appStore.getState().auth.accessToken;

  if (!token) {
    const error = new Error("Please log in to continue.");
    error.status = 401;
    throw error;
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // An older request must not clear a newer login session.
    const currentToken = appStore.getState().auth.accessToken;

    if (currentToken === token) {
      sessionStorage.removeItem(TOKEN_KEY);
      appStore.dispatch(clearCredentials());

      window.dispatchEvent(new Event("bookbazaar:session-expired"));
    }

    const error = new Error(
      "Your session is invalid or has expired. Please log in again."
    );

    error.status = 401;
    throw error;
  }

  return response;
}