import DashboardHeaderSection from "../components/Fragments/DashboardHeaderSection";
import FoodCard from "../components/Elements/FoodCard";
import { useTitle } from "../hooks/useTitle";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRecipes, searchRecipes } from "../api/services/snackService";
import NoResult from "../components/Elements/NoResult";
import { Player } from "@lottiefiles/react-lottie-player";

const DashboardPage = () => {
  useTitle({ title: "Dashboard" });

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState(""); // State for search query
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error handling
  const accessToken = localStorage.getItem("accessToken");
  const username = useLogin(accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      const fetchRecipes = async () => {
        setIsLoading(true); // Set loading to true
        setError(""); // Clear error before fetching
        try {
          const response = await getRecipes();
          setRecipes(response.recipes || []); // Update recipes with fetched data
        } catch (error) {
          console.error("Error fetching recipes:", error);
          setError("Failed to load recipes. Please try again later."); // Set error message
          setRecipes([]);
        } finally {
          setIsLoading(false); // Set loading to false after fetching
        }
      };
      fetchRecipes();
    }
  }, [accessToken]);

  // Handle search action
  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery); // Update query state
    setIsLoading(true); // Set loading to true
    setError(""); // Clear error before fetching
    try {
      const response = await searchRecipes(searchQuery); // Fetch search results
      setRecipes(response.results || []); // Update recipes with search results
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to perform search. Please try again later."); // Set error message
      setRecipes([]); // Clear recipes if there's an error
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="container m-auto flex flex-col px-2 py-4 w-full">
      <DashboardHeaderSection username={username} onSearch={handleSearch} />
      <div>
        <p className="text-sm mb-6">
          {query ? `Results for "${query}"` : "Recommended For You"}
        </p>
        {isLoading ? ( // Check if loading is true
          <div className="flex justify-center items-center h-40 mt-32">
            <div className="">
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
        ) : error ? ( // Check if there's an error
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
