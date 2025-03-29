import { useState } from "react";

const AutoComplete = ({ data, filters, setFilters }) => {
  const [displayAutoCom, setDisplayAutoComp] = useState(true);
  console.log(filters);

  let autoCompleteCount = 0;
  return (
    displayAutoCom && (
      <div
        className={
          filters.name
            ? "all-auto-complete display-auto-comp"
            : "all-auto-complete"
        }
      >
        {data.map((autocomplete) => {
          // while (autoCompleteCount < 10) {
          //   autoCompleteCount++;
          return (
            <div
              className="auto-complete"
              onClick={() => {
                setFilters({
                  ...filters,
                  name: autocomplete.title
                    ? autocomplete.title
                    : autocomplete.name,
                });
                setDisplayAutoComp(!displayAutoCom);
              }}
            >
              {autocomplete.title ? autocomplete.title : autocomplete.name}
            </div>
          );
          // }
        })}
      </div>
    )
  );
};
export default AutoComplete;
