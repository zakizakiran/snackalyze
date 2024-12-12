import axios from "axios";
import apiClient from "../client/apiClient";

const baseURL = "/api";

export const userRegister = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/register`, data);
    return response.data; // Successful response
  } catch (error) {
    console.error("Error:", error.response || error);
    const errMessage =
      error.response?.data?.message || // Access the specific error message
      "An unexpected error occurred"; // Default fallback
    return {
      status: "error",
      message: errMessage, // Return extracted error message
    };
  }
};

export const userLogin = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/login`, data);
    return response.data; // Successful response
  } catch (error) {
    console.error("Error:", error.response || error);
    const errMessage =
      error.response?.data?.message || // Access the specific error message
      "An unexpected error occurred"; // Default fallback
    return {
      status: "error",
      message: errMessage, // Return extracted error message
    };
  }
};

export const userLogout = async (refreshToken) => {
  try {
    const response = await axios.delete(`${baseURL}/logout`, {
      data: { token: refreshToken },
    });
    console.log("Logout response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response || error);
    throw error;
  }
};

export const dashboardData = async (accessToken) => {
  try {
    const response = await apiClient.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Dashboard data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error.response || error);
    throw error;
  }
};
