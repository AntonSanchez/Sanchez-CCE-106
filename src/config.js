// Swap this for your real backend when you have one.
// reqres.in is a free mock API used here so login/logout/session flows
// are testable immediately, with zero backend setup.
//
// Test credentials that reqres.in accepts for POST /api/login:
//   email:    eve.holt@reqres.in
//   password: cityslicka
export const API_BASE_URL = "https://reqres.in/api";

export const STORAGE_KEYS = {
  TOKEN: "studentportal_auth_token",
  USER: "studentportal_auth_user",
};
