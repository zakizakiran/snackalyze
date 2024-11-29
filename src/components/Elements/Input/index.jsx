const Input = (props) => {
  const { placeholder, type, name } = props;
  return (
    <div className="mb-6">
      <input
        className="text-sm border-b w-full py-2 px-3 leading-tight outline-none focus:border-primary"
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default Input;
