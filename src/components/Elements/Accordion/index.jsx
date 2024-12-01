const Accordion = (props) => {
  const { title, desc, checked = false } = props;
  return (
    <div className="collapse collapse-arrow bg-base-200 mb-3 hover:bg-slate-100">
      {checked ? (
        <input type="radio" name="my-accordion-2" defaultChecked />
      ) : (
        <input type="radio" name="my-accordion-2" />
      )}
      <div className="collapse-title text-sm font-semibold">{title}</div>
      <div className="collapse-content">
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>
  );
};

export default Accordion;
