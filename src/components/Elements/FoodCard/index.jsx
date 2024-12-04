import { PiCheckCircleDuotone, PiTimerDuotone } from "react-icons/pi";

const FoodCard = (props) => {
  const { image, title, time } = props;
  return (
    <div className="border border-slate-200 rounded-lg lg:max-w-xs h-fit">
      <img
        src={image}
        alt="snack-image"
        className="w-full object-contain rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-base font-poppinsMedium mb-4">{title}</p>
          <div className="flex gap-1 items-center bg-gray-100 h-fit p-2 rounded">
            <PiTimerDuotone size={"1rem"} />
            <p className="font-semibold text-[10px] text-gray-400 ">{time}</p>
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm gap-1">
          <PiCheckCircleDuotone size={"1.2rem"} />
          <p>Safe</p>
          <p>for you</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
