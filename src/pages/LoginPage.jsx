import LoginForm from "../components/Fragments/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";
import { useTitle } from "../hooks/useTitle";

const LoginPage = () => {
  useTitle({ title: "Login" });

  return (
    <AuthLayout title="Login" type="login">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
