import { User } from "../../types/user";

export function authHeader() {
  try {
    let auth = localStorage.getItem("auth");
    if (auth) {
      const user = JSON.parse(auth) as User;
      console.log(auth);
      return auth ? { Authorization: `Bearer ${user.accessToken}` } : {};
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}
