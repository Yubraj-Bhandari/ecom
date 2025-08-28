import axios from "axios";
import { type User } from "../types";

const API_BASE = "https://dummyjson.com";

// Login against DummyJSON API and store the returned token
export const login = async (user: {
  username: string;
  password: string;
}): Promise<{ token: string; refreshToken: string }> => {
  const res = await axios.post(`${API_BASE}/auth/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const apiToken: string = res.data.accessToken; //  extract accessToken

  // Store access token
  localStorage.setItem("token", apiToken);

  // DummyJSON provides a refresh token
  const refreshToken = res.data.refreshToken || crypto.randomUUID();
  localStorage.setItem("refreshToken", refreshToken);

  return { token: apiToken, refreshToken };
};

// Register a new user
export const signup = async (user: User): Promise<User> => {
  const res = await axios.post(`${API_BASE}/users/add`, user);
  return res.data;
};

// "Refresh" the token using DummyJSON's /auth/refresh endpoint
export const refreshToken = async (refreshToken: string): Promise<string> => {
  try {
    const res = await axios.post(`${API_BASE}/auth/refresh`, {
      refreshToken: refreshToken,
      expiresInMins: 30, // optional, defaults to 60
    });
    const newAccessToken: string = res.data.accessToken; //  extract accessToken
    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token");
  }
};

// Validate token presence (no JWT verification in browser)
export const validateToken = (): boolean => {
  const token = localStorage.getItem("token");
  return Boolean(token);
};

// Helper to attach auth header
export const getAuthHeader = (): { Authorization?: string } => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Logout helper
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login"; // Redirect to login page
};
