import Button from "../Elements/Button";
import Input from "../Elements/Input";

const RegisterForm = () => {
  return (
    <form>
      <Input placeholder="Full Name" type="text" name="name" />
      <Input placeholder="Enter email address" type="email" name="email" />
      <Input placeholder="Enter password" type="password" name="password" />
      <Button
        type="submit"
        classname="bg-primary hover:bg-black text-white w-full mt-6"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
