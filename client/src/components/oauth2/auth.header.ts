export function authHeader() {
  const auth = JSON.parse(localStorage.getItem("auth") || "");
  return auth && auth.accessToken
    ? { Authorization: `Bearer ${auth.accessToken}` }
    : {};
}
