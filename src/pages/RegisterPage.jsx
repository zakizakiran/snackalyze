import { useEffect } from "react";
import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Register | Snackalyze";
  });

  return (
    <AuthLayout title="Create an Account" type="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
