const Select = (props) => {
  return (
    <select
      className={props.className}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}>
      {props.list.map((element) => (
        <option value={element.value}>{element.value}</option>
      ))}
    </select>
  );
};

export { Select };
