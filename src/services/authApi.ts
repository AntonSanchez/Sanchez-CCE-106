import { apiRequest } from './api';

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin';
};

/**
 * Sends email/password to the login endpoint.
 * Expected response shape: { token: string }
 */
export async function login(email: string, password: string): Promise<string> {
  const data = await apiRequest('/login', {
    method: 'POST',
    body: { email, password },
  });

  if (!data?.token) {
    throw new Error('Login succeeded but no token was returned by the server.');
  }

  return data.token as string;
}

/**
 * Example PROTECTED request: fetches the logged-in user's profile using the
 * bearer token. Swap the path/shape for your real backend's "/me" endpoint.
 */
export async function fetchProfile(token: string): Promise<UserProfile> {
  const data = await apiRequest('/users/2', { token });
  const user = data?.data;
  return {
    id: user?.id,
    name: `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() || 'Student',
    email: user?.email,
    avatar: user?.avatar,
    role: user?.id % 2 === 0 ? 'student' : 'admin', // demo-only role assignment
  };
}
