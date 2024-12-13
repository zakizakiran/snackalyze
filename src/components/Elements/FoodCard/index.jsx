import {
  PiCheckCircleDuotone,
  PiTimerDuotone,
  PiWarningDuotone,
} from "react-icons/pi";

const FoodCard = (props) => {
  const { image, title, time, allergy, aisles } = props;

  console.log("Allergy props:", allergy);
  console.log("Aisles props:", aisles);

  // Pengecekan alergi dengan validasi data
  const isSafe = !allergy.some((userAllergy) =>
    aisles.some((aisle) =>
      String(aisle).toLowerCase().includes(userAllergy.toLowerCase())
    )
  );

  return (
    <div className="group border hover:bg-gray-100 border-slate-200 rounded-lg lg:max-w-xs h-full relative overflow-hidden transition-transform duration-300">
      {/* Image section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt="snack-image"
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
        />
        {/* Minutes display */}
        <div className="absolute top-2 right-2 bg-gray-100 h-fit w-auto p-2 rounded flex gap-1 items-center">
          <PiTimerDuotone size={"1rem"} />
          <p className="font-semibold text-[10px] text-gray-400">{time} min</p>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col h-28 justify-between">
        <div>
          <p className="text-base font-poppinsMedium line-clamp-2">
            {title.substring(0, 30)}...
          </p>
        </div>
        <div
          className={`flex items-center text-sm gap-1 ${
            isSafe ? "text-green-500" : "text-red-500"
          }`}
        >
          {isSafe ? (
            <>
              <PiCheckCircleDuotone size={"1.2rem"} />
              <p>Safe For You</p>
            </>
          ) : (
            <>
              <PiWarningDuotone size={"1.2rem"} />
              <p>Contains Allergens</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
