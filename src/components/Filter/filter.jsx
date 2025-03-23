import("./filter.css");
import { useEffect, useState } from "react";
import AutoComplete from "./AutoComplete";

const Filter = ({ name, filters, setFilters, data }) => {
  const [displayAutocomplete, setDisplayAutocomplete] = useState(false);
  console.log(data);

  useEffect(() => {
    setDisplayAutocomplete(true);
  }, [filters]);

  return (
    <div className="filter">
      <div className="form-filter">
        <div className="form-input">
          <input
            type="text"
            name={name}
            id="name"
            placeholder={"Search"}
            value={filters.name}
            onChange={(event) => {
              setFilters((prevState) => {
                return { ...prevState, name: event.target.value, page: 1 };
              });
            }}
          />
        </div>
        {filters.name &&
          data.results &&
          data.results.length > 0 &&
          displayAutocomplete && (
            <AutoComplete
              data={data.results}
              filters={filters}
              setFilters={setFilters}
            />
          )}
      </div>
    </div>
  );
};
export default Filter;
