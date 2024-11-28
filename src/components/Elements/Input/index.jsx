const Input = (props) => {
  const { placeholder, type, name } = props;
  return (
    <div className="mb-6">
      <input
        className="font-poppins text-sm border-b rounded w-full py-2 px-3 text-slate-500 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default Input;
