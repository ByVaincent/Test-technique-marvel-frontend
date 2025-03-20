import ("./filter.css")

const Filter = ({name, filters, setFilters}) => {
return <div className="filter">
    <input type="text" name={name} id="name" value={filters.name} onChange = {(event) => {
        setFilters(prevState => {
            return {...prevState, name: event.target.value, page: 1}
        })
    }} />
</div>
}
export default Filter