import axios from "axios";

const baseURL = "https://api.spoonacular.com";
const apiKey = "b8d5ad9299ff414d8273ea321baba7b2";

export const getRecipes = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/recipes/random?apiKey=${apiKey}&number=4`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return [];
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(
      `${baseURL}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=4&addRecipeInformation=true`
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error);
    return [];
  }
};
