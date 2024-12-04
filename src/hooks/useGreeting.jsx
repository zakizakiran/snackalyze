import { useEffect, useState } from "react";
import {
  PiSunHorizonDuotone,
  PiSunDuotone,
  PiMoonStarsDuotone,
} from "react-icons/pi";

export const useGreetings = () => {
  const currentTime = new Date().getHours();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (currentTime < 12) {
      setGreeting(
        <span className="flex justify-center items-center gap-2">
          <PiSunHorizonDuotone className="text-yellow-500" size={"1.8rem"} />{" "}
          Good Morning
        </span>
      );
    } else if (currentTime < 18) {
      setGreeting(
        <span className="flex justify-center items-center gap-2">
          <PiSunDuotone className="text-yellow-500" size={"1.8rem"} /> Good
          Afternoon
        </span>
      );
    } else {
      setGreeting(
        <span className="flex justify-center items-center gap-2">
          <PiMoonStarsDuotone className="text-blue-950" size={"1.8rem"} /> Good
          Evening
        </span>
      );
    }
  }, [currentTime]);

  return greeting;
};
