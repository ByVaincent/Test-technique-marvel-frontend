const AutoComplete = ({ data, filters, setFilters }) => {
  let autoCompleteCount = 0;
  return (
    <div className="all-auto-complete">
      {data.map((autocomplete) => {
        while (autoCompleteCount < 10) {
          autoCompleteCount++;
          return (
            <div
              className="auto-complete"
              onClick={() => {
                console.log("click");

                setFilters({
                  ...filters,
                  name: autocomplete.title
                    ? autocomplete.title
                    : autocomplete.name,
                });
              }}
            >
              {autocomplete.title ? autocomplete.title : autocomplete.name}
            </div>
          );
        }
      })}
    </div>
  );
};
export default AutoComplete;
