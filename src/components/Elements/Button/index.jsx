const Button = (props) => {
  const { type, children, classname, onClick, disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classname} font-bold py-3 px-4 rounded-md tracking-wider duration-150 ease-in-out`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
