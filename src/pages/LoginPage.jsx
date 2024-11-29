import { useEffect } from "react";
import LoginForm from "../components/Fragments/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login | Snackalyze";
  });

  return (
    <AuthLayout title="Login" type="login">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
