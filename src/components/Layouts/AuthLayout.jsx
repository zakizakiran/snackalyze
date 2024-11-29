import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { title, children, type } = props;
  return (
    <div className="flex justify-center py-16 sm:items-center">
      <div className="w-full px-6 sm:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl lg:text-4xl mb-16 font-poppins font-bold tracking-wider">
          WELCOME TO SNACKALYZE
        </h1>
        <h1 className="text-2xl lg:text-3xl font-poppinsMedium mb-4">
          {title}
        </h1>
        <p className="font-poppins text-sm text-slate-500 mb-10">
          Please enter your details below
        </p>
        {children}
        <AuthType type={type} />
      </div>
    </div>
  );
};

const AuthType = ({ type }) => {
  return (
    <p className="text-center text-sm mt-10 font-poppins">
      {type === "login"
        ? "Don't have an account? "
        : "Already have an account? "}

      {type === "login" && (
        <Link className="text-primary tracking-wider font-bold" to="/register">
          Register
        </Link>
      )}
      {type === "register" && (
        <Link className="text-primary tracking-wider font-bold" to="/login">
          Login
        </Link>
      )}
    </p>
  );
};

export default AuthLayout;
