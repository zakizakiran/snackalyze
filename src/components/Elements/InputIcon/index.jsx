const InputIcon = (props) => {
  const { icon, type, placeholder, onKeyDown } = props;
  return (
    <div className="relative w-full">
      <input
        onKeyDown={onKeyDown}
        type={type}
        placeholder={placeholder}
        className="p-4 pl-10 rounded-lg bg-slate-100 w-full placeholder:text-sm active:outline-none focus:outline-none"
      />
      {icon}
    </div>
  );
};

export default InputIcon;
