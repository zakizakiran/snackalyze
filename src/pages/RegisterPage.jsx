import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayout from "../components/Layouts/AuthLayout";
import { useTitle } from "../hooks/useTitle";

const RegisterPage = () => {
  useTitle({ title: "Register" });

  return (
    <AuthLayout title="Create an Account" type="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
