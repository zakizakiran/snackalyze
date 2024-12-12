import axios from "axios";
import { refreshAccessToken } from "../helpers/api";

const apiClient = axios.create({
  baseURL: "/api",
});

// Add a request interceptor to include the access token
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshAccessToken(); // Refresh the token
        error.config.headers.Authorization = `Bearer ${newToken}`; // Set the new token
        return apiClient(error.config); // Retry the failed request
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Optionally redirect to login page if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
