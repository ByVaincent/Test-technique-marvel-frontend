import("./filter.css");

const Filter = ({ name, filters, setFilters }) => {
  return (
    <div className="filter">
      <div className="form-input">
        <input
          type="text"
          name={name}
          id="name"
          placeholder="Search"
          value={filters.name}
          onChange={(event) => {
            setFilters((prevState) => {
              return { ...prevState, name: event.target.value, page: 1 };
            });
          }}
        />
      </div>
    </div>
  );
};
export default Filter;
