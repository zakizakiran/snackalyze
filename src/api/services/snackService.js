import axios from "axios";

const baseURL = import.meta.env.VITE_APP_SPOONA_API_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY3;

export const getRecipes = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/recipes/random?apiKey=${apiKey}&number=15`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return [];
  }
};

export const getRecipesById = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/recipes/${id}/information?apiKey=${apiKey}`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return {};
  }
};

export const getNutritionById = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return {};
  }
};

export const getSnackByUpc = async (upc) => {
  try {
    const response = await axios.get(
      `${baseURL}/food/products/upc/${upc}?apiKey=${apiKey}`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return {};
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(
      `${baseURL}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10&addRecipeInformation=true`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return [];
  }
};
