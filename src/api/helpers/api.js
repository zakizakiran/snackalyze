import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = "/api";

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token); // Decodes the token to check expiration time
    const currentTime = Date.now() / 1000; // Current time in seconds
    return exp < currentTime; // Returns true if expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Return true if there is an error decoding the token
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found in localStorage");
    }

    const response = await axios.post(`${baseURL}/token`, {
      token: refreshToken,
    });

    const { accessToken } = response.data;

    // Save the new access token in localStorage
    localStorage.setItem("accessToken", accessToken);
    return accessToken; // Return the new token for immediate use if needed
  } catch (error) {
    console.error("Error refreshing token:", error.response || error);
    throw error;
  }
};
