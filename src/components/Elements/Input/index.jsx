const Input = (props) => {
  const { placeholder, type, name, onChange } = props;
  return (
    <div className="mb-6">
      <input
        className="text-sm border-b w-full py-2 px-3 leading-tight outline-none focus:border-primary"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
