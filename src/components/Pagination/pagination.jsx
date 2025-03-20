import ("./pagination.css")
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import updatePagination from "../../utils/updatePagination";

const Pagination = ({count, filters, setFilters}) => {

 const pages = Math.ceil(count / 100);
    
return  <div className="container">
    
    <div className="pagination">
    <div className="arrow-container">
           {filters.page > 1 && <div className="arrows" onClick={event => updatePagination(event, "-",filters, setFilters)}>
            <GrFormPrevious />
        </div>}

    </div>
     
        <div className="pages">
            {filters.page + " / " + pages}
        </div>
        <div className="arrow-container">
             {filters.page < pages && <div className="arrows" onClick={(event) => updatePagination(event, "+",filters, setFilters)}>
            <GrFormNext />
        </div>}
        </div>
       
    </div>

</div>
}
export default Pagination