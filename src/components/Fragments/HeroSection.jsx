import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleExplore = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container text-center m-auto mb-16 lg:mb-20">
      <div className="lg:w-1/3 m-auto">
        <h1 className="font-bold text-3xl mb-8">
          Scan snacks, get insights, snack smarter!
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Discover the story behind every bite—scan, analyze, and enjoy your
          snacks smarter with Snackalyze!
        </p>
        <Button
          onClick={handleExplore}
          classname="bg-primary text-white px-8 py-4 hover:bg-black"
        >
          Explore Now!
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
