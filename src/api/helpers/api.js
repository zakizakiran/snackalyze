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

export const refreshToken = async (refreshTokenStr) => {
  try {
    const response = await axios.post(`${baseURL}/token`, {
      token: refreshTokenStr,
    });
    return response.data.accessToken; // Assuming the backend returns the new access token
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Propagate error to be handled by the interceptor
  }
};
