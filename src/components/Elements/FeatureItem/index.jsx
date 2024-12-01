const FeatureItem = (props) => {
  const { title, desc, icon } = props;
  return (
    <div className="hover:-translate-y-3 duration-150 transition-all">
      <p className="flex items-center gap-3 font-semibold mb-3 ">
        {icon} {title}
      </p>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

export default FeatureItem;
