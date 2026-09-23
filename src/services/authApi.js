import { apiRequest } from "./api";

/**
 * Sends email/password to the login endpoint.
 * Expected response shape: { token: string }
 * (reqres.in returns exactly this on success)
 */
export async function login(email, password) {
  const data = await apiRequest("/login", {
    method: "POST",
    body: { email, password },
  });

  if (!data?.token) {
    // Defensive: guards against a backend change / unexpected response shape,
    // which is the #1 "token is undefined" mistake from the troubleshooting slide.
    throw new Error("Login succeeded but no token was returned by the server.");
  }

  return data.token;
}

/**
 * Example PROTECTED request: fetches the logged-in user's profile using the
 * bearer token. Swap the path/shape for your real backend's "/me" endpoint.
 */
export async function fetchProfile(token) {
  const data = await apiRequest("/users/2", { token });

  // Normalize reqres.in's shape into what the app's UI expects.
  const user = data?.data;
  return {
    id: user?.id,
    name: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || "Student",
    email: user?.email,
    avatar: user?.avatar,
    role: user?.id % 2 === 0 ? "student" : "admin", // demo-only role assignment
  };
}
