import { API_BASE_URL } from '../config';

export class AuthError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message || 'Not authorized');
    this.name = 'AuthError';
    this.status = status; // 401 or 403
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message || 'Request failed');
    this.name = 'ApiError';
    this.status = status;
  }
}

type ApiRequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
};

/**
 * apiRequest("/users/2", { token })
 *
 * - Adds `Authorization: Bearer <token>` automatically when a token is passed.
 * - Parses JSON safely (some endpoints return empty bodies).
 * - Maps 401/403 to AuthError so the app can log the user out in one place.
 */
export async function apiRequest(
  path: string,
  { method = 'GET', body, token, headers }: ApiRequestOptions = {}
): Promise<any> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your connection.');
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // no/invalid JSON body — fine for some responses
  }

  if (response.status === 401 || response.status === 403) {
    throw new AuthError(response.status, data?.error || 'Your session has expired. Please log in again.');
  }

  if (!response.ok) {
    throw new ApiError(response.status, data?.error || `Request failed (${response.status})`);
  }

  return data;
}
