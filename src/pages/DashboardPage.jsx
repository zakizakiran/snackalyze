import DashboardHeaderSection from "../components/Fragments/DashboardHeaderSection";
import FoodCard from "../components/Elements/FoodCard";
import { useTitle } from "../hooks/useTitle";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getRecipes,
  searchRecipes,
  getRecipesById,
} from "../api/services/snackService";
import NoResult from "../components/Elements/NoResult";
import { Player } from "@lottiefiles/react-lottie-player";
import { getUserAllergy } from "../api/services/authService";
import { jwtDecode } from "jwt-decode";

const DashboardPage = () => {
  useTitle({ title: "Dashboard" });

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]); // User allergy state
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const username = useLogin(accessToken);
  const userId = jwtDecode(accessToken).id;

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        setIsLoading(true);
        setError("");

        try {
          // Fetch recipes and user allergies concurrently
          const [recipesResponse, allergiesResponse] = await Promise.all([
            getRecipes(),
            getUserAllergy(userId),
          ]);

          // Log the raw allergy response

          // Process recipes
          const fetchedRecipes = recipesResponse.recipes || [];
          const recipesWithAisles = await Promise.all(
            fetchedRecipes.map(async (recipe) => {
              try {
                const details = await getRecipesById(recipe.id);

                return {
                  ...recipe,
                  aisles:
                    details.extendedIngredients.map(
                      (ingredient) => ingredient.aisle
                    ) || [],
                };
              } catch (error) {
                console.error(
                  `Failed to fetch details for recipe ${recipe.id}:`,
                  error
                );
                return { ...recipe, aisles: [] }; // Default to empty aisles on failure
              }
            })
          );

          setRecipes(recipesWithAisles);

          // Process allergies safely
          const allergies =
            allergiesResponse?.response?.payload?.Allergy?.[0]?.allergy?.data ||
            [];
          setUserAllergies(allergies);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [accessToken, navigate, userId]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setError("");
    try {
      const response = await searchRecipes(searchQuery);
      const searchResults = response.results || [];

      const resultsWithAisles = await Promise.all(
        searchResults.map(async (recipe) => {
          const details = await getRecipesById(recipe.id);
          return {
            ...recipe,
            aisles:
              details.extendedIngredients.map(
                (ingredient) => ingredient.aisle
              ) || [],
          };
        })
      );

      setRecipes(resultsWithAisles);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to perform search. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container m-auto flex flex-col px-2 py-4 w-full">
      <DashboardHeaderSection username={username} onSearch={handleSearch} />
      <div>
        <p className="text-sm mb-6">
          {query ? `Results for "${query}"` : "Recommended For You"}
        </p>
        {isLoading ? (
          <div className="flex justify-center items-center h-40 mt-32">
            <div>
              <Player
                src="/animations/loader-animation.json"
                className="player w-28"
                loop
                speed={2}
                autoplay
              />
              <p className="text-gray-500 text-center my-8">Loading...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <Link to={`/food/${recipe.id}`} key={recipe.id}>
                <FoodCard
                  title={recipe.title}
                  time={recipe.readyInMinutes}
                  image={recipe.image}
                  allergy={userAllergies}
                  aisles={recipe.aisles || []}
                />
              </Link>
            ))}
          </div>
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
