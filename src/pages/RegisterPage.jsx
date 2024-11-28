import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const RegisterPage = () => {
  return (
    <AuthLayout title="Create an Account" type="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
