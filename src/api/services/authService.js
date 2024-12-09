import axios from "axios";
import { jwtDecode } from "jwt-decode";
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

export const userLogout = async () => {
  try {
    const response = await axios.post(`${baseURL}/logout`);
    return response.data; // Successful response
  } catch (error) {
    console.error("Error:", error.response || error);
    throw error; // Propagate error to be handled by the interceptor
  }
};

export const getUserProfile = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwtDecode(token);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

export const dashboardData = async () => {
  try {
    const response = await apiClient.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error.response || error);
    throw error;
  }
};
