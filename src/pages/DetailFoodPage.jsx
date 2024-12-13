import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNutritionById, getRecipesById } from "../api/services/snackService";
import { getUserAllergy } from "../api/services/authService";
import { Player } from "@lottiefiles/react-lottie-player";
import { PiCheckCircleDuotone, PiWarningDuotone } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";

const DetailFoodPage = () => {
  const { id } = useParams();
  const [detailFood, setDetailFood] = useState({});
  const [nutrition, setNutrition] = useState({});
  const [userAllergies, setUserAllergies] = useState([]); // State for user allergies
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      const fetchDetailFood = async () => {
        setIsLoading(true); // Start loading
        try {
          const recipeResponse = await getRecipesById(id);
          const nutritionResponse = await getNutritionById(id);
          const allergiesResponse = await getUserAllergy(jwtDecode(token).id); // Fetch user allergies

          setNutrition(nutritionResponse);
          setDetailFood(recipeResponse);

          const allergies =
            allergiesResponse?.response?.payload?.Allergy?.[0]?.allergy?.data ||
            [];
          setUserAllergies(allergies);
        } catch (error) {
          console.error("Error fetching detail food:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };
      fetchDetailFood();
    }
  }, [navigate, id]);

  // Function to get specific nutrient value
  const getNutrientValue = (name) => {
    const nutrient = nutrition.nutrients?.find((item) => item.name === name);
    return nutrient ? nutrient.amount : "N/A"; // Show 'N/A' if nutrient is not found
  };

  // Check if food is safe based on user allergies
  const isSafe = !userAllergies.some((userAllergy) =>
    detailFood.extendedIngredients?.some((ingredient) =>
      ingredient.aisle.toLowerCase().includes(userAllergy.toLowerCase())
    )
  );

  return (
    <div className="lg:py-6">
      {isLoading ? ( // Show loading if isLoading is true
        <div className="flex justify-center items-center h-40">
          <div className="">
            <Player
              src="/animations/loader-animation.json"
              className="player w-28"
              loop
              speed={2}
              autoplay
            />
            <p className="text-gray-500 text-center mt-6">
              Getting Recipe Ready...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="sm:flex gap-6">
            <img
              className="w-full object-cover rounded-lg sm:w-1/2 mb-8"
              src={detailFood.image}
              alt="food-image"
            />
            <div className="w-full">
              <h1 className="text-xl lg:text-2xl font-bold px-2 mb-6">
                {detailFood.title}
              </h1>
              <div
                className={`flex items-center text-sm gap-1 px-2 mb-8 ${
                  isSafe ? "text-green-500" : "text-red-500"
                }`}
              >
                {isSafe ? (
                  <>
                    <PiCheckCircleDuotone size={"1.5rem"} />
                    <p className="lg:text-lg">Safe For You</p>
                  </>
                ) : (
                  <>
                    <PiWarningDuotone size={"1.5rem"} />
                    <p className="lg:text-lg">Contains Allergens</p>
                  </>
                )}
              </div>
              <div className="border flex p-4 rounded-lg gap-8 lg:gap-16 justify-center items-center mb-4">
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{detailFood.readyInMinutes}</p>
                  <p className="text-gray-400">Minutes</p>
                </div>
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{nutrition.ingredients?.length || 0}</p>
                  <p className="text-gray-400">Ingredients</p>
                </div>
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{detailFood.servings}</p>
                  <p className="text-gray-400">Servings</p>
                </div>
              </div>
              <div className="border flex flex-col px-4 py-6 rounded-lg gap-8 lg:gap-12 justify-center mb-8">
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{getNutrientValue("Fat")}</p>
                  <p className="text-gray-400">Total Fat (g)</p>
                </div>
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{getNutrientValue("Carbohydrates")}</p>
                  <p className="text-gray-400">Carbohydrates (g)</p>
                </div>
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{getNutrientValue("Calories")}</p>
                  <p className="text-gray-400">Calories (kcal)</p>
                </div>
                <div className="text-center text-sm lg:text-base font-poppinsMedium">
                  <p>{getNutrientValue("Sugar")}</p>
                  <p className="text-gray-400">Total Sugar (g)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 h-full gap-8">
            <div className="border flex flex-col p-6 rounded-lg sm:h-96">
              <h1 className="text-xl font-semibold mb-8">Ingredients</h1>
              <ul className="px-6 overflow-hidden overflow-y-scroll">
                {detailFood.extendedIngredients?.map((ingredient) => {
                  const isAllergenic = userAllergies.includes(ingredient.aisle);
                  return (
                    <li
                      key={ingredient.id}
                      className={`text-sm lg:text-base font-poppinsMedium list-disc pl-1 mb-4 ${
                        isAllergenic ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {ingredient.original}
                      {isAllergenic && (
                        <span className="ml-2 text-red-500 text-xs">
                          (Allergenic)
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border flex flex-col p-6 rounded-lg sm:h-96">
              <h1 className="text-xl font-semibold mb-8">Instructions</h1>
              <div className="px-4 overflow-hidden overflow-y-scroll">
                {detailFood.analyzedInstructions?.[0]?.steps?.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-center gap-4 mb-4"
                  >
                    <div className="flex items-center justify-center bg-primary p-2 text-white rounded-full h-6 w-6">
                      <p className="text-sm font-poppinsMedium">
                        {step.number}
                      </p>
                    </div>
                    <div className="text-gray-600">
                      <p className="text-sm lg:text-base font-poppinsMedium">
                        {step.step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailFoodPage;
