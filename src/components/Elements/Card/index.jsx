const Card = (props) => {
  const { children, classname } = props;
  return (
    <div className={`container m-auto ${classname} w-full rounded-lg`}>
      {children}
    </div>
  );
};

export default Card;
