import DashboardHeaderSection from "../components/Fragments/DashboardHeaderSection";
import FoodCard from "../components/Elements/FoodCard";
import { useTitle } from "../hooks/useTitle";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes, searchRecipes } from "../api/services/snackService";
import NoResult from "../components/Elements/NoResult";

const DashboardPage = () => {
  useTitle({ title: "Dashboard" });

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState(""); // Added state for search query
  const accessToken = localStorage.getItem("accessToken");
  const username = useLogin(accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  // Fetch default recipes on load
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
        setRecipes(response.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Handle search action
  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery); // Update query state
    try {
      const response = await searchRecipes(searchQuery); // Fetch search results
      setRecipes(response.results); // Update recipes with search results
    } catch (error) {
      console.error("Error searching recipes:", error);
      setRecipes([]); // Clear recipes if there's an error
    }
  };

  return (
    <div className="container m-auto flex flex-col px-2 py-4 w-full">
      <DashboardHeaderSection username={username} onSearch={handleSearch} />
      <div>
        <p className="text-sm mb-6">
          {query ? `Results for "${query}"` : "Recommended For You"}
        </p>
        {recipes.length > 0 ? (
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <FoodCard
                key={recipe.id}
                title={recipe.title}
                time={recipe.readyInMinutes}
                image={recipe.image}
              />
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
