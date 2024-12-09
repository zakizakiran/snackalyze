import axios from "axios";
import { isTokenExpired, refreshToken } from "../helpers/api";

const apiClient = axios.create({
  baseURL: "/api",
});

// Interceptor untuk menangani token kadaluarsa
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshTokenStr = localStorage.getItem("refreshToken");

    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        console.log("Access token expired. Refreshing...");
        if (!refreshTokenStr) {
          throw new Error("No refresh token available. Please log in again.");
        }

        try {
          const newAccessToken = await refreshToken(refreshTokenStr);
          localStorage.setItem("accessToken", newAccessToken); // Simpan token baru
          config.headers.Authorization = `Bearer ${newAccessToken}`; // Update header
        } catch (error) {
          console.error("Failed to refresh token. Redirecting to login.");
          localStorage.clear();
          window.location.href = "/login"; // Redirect ke login jika refresh gagal
          return Promise.reject(error);
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
