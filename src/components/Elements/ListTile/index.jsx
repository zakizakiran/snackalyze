const ListTile = (props) => {
  const { title, body } = props;
  return (
    <div className="border px-4 py-2 text-sm rounded-md">
      <p className="font-poppinsMedium">{title}</p>
      <p className="text-gray-500">{body}</p>
    </div>
  );
};
export default ListTile;
