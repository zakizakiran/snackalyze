import { useEffect, useState } from "react";
import { dashboardData, userLogin } from "../../api/services/authService";
import Button from "../Elements/Button";
import Input from "../Elements/Input/index";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleDuotone } from "react-icons/pi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setErrorMessage("Please fill out both fields.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null); // Clear previous error messages

    try {
      const response = await userLogin({ email, password });

      if (response.status === "error") {
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }

      const { accessToken, refreshToken } = response.response.payload;

      // Save tokens to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Validate dashboard data access
      const dashboardResponse = await dashboardData(accessToken);

      if (dashboardResponse.status === "error") {
        setErrorMessage(dashboardResponse.message);
        setIsLoading(false);
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errorMessage && (
        <div className="flex text-[12px] lg:text-sm text-red-600 justify-center items-center gap-1 my-2">
          <PiWarningCircleDuotone size={"1.2rem"} />
          {errorMessage}
        </div>
      )}
      <Button
        classname="bg-primary p-4 hover:bg-black text-white w-full mt-6"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
