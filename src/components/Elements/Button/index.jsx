const Button = (props) => {
  const { type, children, classname } = props;
  return (
    <button
      type={type}
      className={`${classname} font-bold py-3 px-4 rounded-md font-poppins tracking-wider duration-150 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
