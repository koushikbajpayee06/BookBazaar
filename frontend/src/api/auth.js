const AUTH_API_URL = "http://127.0.0.1:8000/api/auth";

export async function registerUser(userData) {
  const response = await fetch(`${AUTH_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    let message = "Registration failed. Please try again.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail.map((error) => error.msg).join(". ");
    }

    throw new Error(message);
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    let message = "Login failed. Please try again.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail.map((error) => error.msg).join(". ");
    }

    throw new Error(message);
  }

  return data;
}

export async function getCurrentUser(accessToken) {
  const response = await fetch(`${AUTH_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      typeof data.detail === "string"
        ? data.detail
        : "Could not load your account."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}