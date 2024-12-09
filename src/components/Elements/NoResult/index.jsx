import { Player } from "@lottiefiles/react-lottie-player";
import Label from "./label";

const NoResult = () => {
  return (
    <div className="flex justify-center text-center">
      <div>
        <Player
          src="/animations/not-found.json"
          className="player w-40"
          loop
          speed={1.5}
          autoplay
        />
        <Label>No Results Found</Label>
      </div>
    </div>
  );
};

export default NoResult;
