import { API_BASE_URL } from "../config";

// Thrown when the server says the token is missing/invalid/expired.
export class AuthError extends Error {
  constructor(status, message) {
    super(message || "Not authorized");
    this.name = "AuthError";
    this.status = status; // 401 or 403
  }
}

// Thrown for any other non-OK response (validation errors, 500s, etc).
export class ApiError extends Error {
  constructor(status, message) {
    super(message || "Request failed");
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * apiRequest("/users/2", { token })
 *
 * - Adds `Authorization: Bearer <token>` automatically when a token is passed.
 * - Parses JSON safely (some endpoints return empty bodies).
 * - Maps 401/403 to AuthError so the app can log the user out in one place,
 *   instead of every screen having to check response.status itself.
 */
export async function apiRequest(path, { method = "GET", body, token, headers } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw new ApiError(0, "Could not reach the server. Check your connection.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // no/invalid JSON body — fine for some responses
  }

  if (response.status === 401 || response.status === 403) {
    throw new AuthError(response.status, data?.error || "Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, data?.error || `Request failed (${response.status})`);
  }

  return data;
}
