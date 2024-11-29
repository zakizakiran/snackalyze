import Button from "../Elements/Button";
import Input from "../Elements/Input/index";

const LoginForm = () => {
  return (
    <form>
      <Input placeholder="example@mail.com" type="email" name="email" />
      <Input placeholder="*******" type="password" name="password" />
      <Button
        type="submit"
        classname="bg-primary hover:bg-black text-white w-full mt-6"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
