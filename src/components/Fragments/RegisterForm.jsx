import { useState } from "react";
import { userRegister } from "../../api/services/authService";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleDuotone } from "react-icons/pi";
import ModalBox from "../Elements/ModalBox"; // Ensure this is imported correctly

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    setResponseMessage(""); // Clear previous messages

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      password2: formData.get("password2"),
    };

    // Validation for input fields
    if (!data.username || !data.email || !data.password || !data.password2) {
      setResponseMessage("Please fill out all fields.");
      return;
    }

    // Validation for password length
    if (data.password.length < 8) {
      setResponseMessage("Password must be at least 8 characters long.");
      return;
    }

    // Validation for password confirmation
    if (data.password !== data.password2) {
      setResponseMessage("Passwords do not match.");
      return;
    }

    try {
      // Call userRegister API
      const response = await userRegister(data);
      console.log(response);

      if (response.status === "error") {
        // Show error message if registration fails
        setResponseMessage(response.message);
        return;
      }

      // Open modal if registration is successful
      openModal();

      setTimeout(() => {
        closeModal();
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error during registration:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <Input placeholder="Username" type="text" name="username" />
        <Input placeholder="Enter email address" type="email" name="email" />
        <Input placeholder="Enter password" type="password" name="password" />
        <Input
          placeholder="Confirm password"
          type="password"
          name="password2"
        />
        {responseMessage && (
          <div className="text-[12px] lg:text-sm text-center text-red-600 flex items-center justify-center gap-1 my-2">
            <PiWarningCircleDuotone size={"1rem"} />
            {responseMessage}
          </div>
        )}

        <Button
          type="submit"
          classname="bg-primary hover:bg-black text-white w-full mt-6"
        >
          Register
        </Button>
      </form>
      {/* Registration Confirmation Modal */}
      {isModalOpen && (
        <ModalBox
          isAnimation={true}
          animation="success_animation.json"
          classname="w-full"
          title="Registration Successful"
          description="Your account has been created! You will be redirected to the login page shortly."
          isSecondaryAction={false}
          isPrimaryAction={false}
          primaryAction={closeModal}
        />
      )}
    </div>
  );
};

export default RegisterForm;
