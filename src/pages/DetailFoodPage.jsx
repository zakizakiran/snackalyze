import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNutritionById, getRecipesById } from "../api/services/snackService";
import { Player } from "@lottiefiles/react-lottie-player";
import { PiCheckCircleDuotone } from "react-icons/pi";

const DetailFoodPage = () => {
  const { id } = useParams();
  const [detailFood, setDetailFood] = useState({});
  const [nutrition, setNutrition] = useState({});
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
          setNutrition(nutritionResponse);
          setDetailFood(recipeResponse);
        } catch (error) {
          console.error("Error fetching detail food:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };
      fetchDetailFood();
    }
  }, [navigate, id]);

  // Fungsi untuk mendapatkan nilai nutrient tertentu
  const getNutrientValue = (name) => {
    const nutrient = nutrition.nutrients?.find((item) => item.name === name);
    return nutrient ? nutrient.amount : "N/A"; // Tampilkan 'N/A' jika nutrient tidak ditemukan
  };

  return (
    <div className="lg:py-6">
      {isLoading ? ( // Tampilkan loading jika isLoading true
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
              <div className="flex items-center text-green-500 text-sm gap-1 px-2 mb-8">
                <PiCheckCircleDuotone size={"1.5rem"} />
                <p className="lg:text-lg">Safe</p>
                <p className="lg:text-lg">for you</p>
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
                {detailFood.extendedIngredients?.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="text-gray-600 text-sm lg:text-base font-poppinsMedium list-disc pl-1 mb-4"
                  >
                    {ingredient.original}
                  </li>
                ))}
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
