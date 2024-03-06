import { User } from "../../types/user";

export function authHeader() {
  try {
    let userStore = localStorage.getItem("user");
    if (userStore) {
      const user = JSON.parse(userStore) as User;
      return user ? { Authorization: `Bearer ${user.accessToken}` } : {};
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

export function getCurrentUser() {
  try {
    let userStore = localStorage.getItem("user");
    if (userStore) {
      const user = JSON.parse(userStore) as User;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
