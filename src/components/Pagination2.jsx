import { Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../store/filters/filtersSlice"; 


// This is only for filtering products in frontend, not in backend. 
const Pagination2 = ({productsCount, productsPerPage}) => {
    const dispatch = useDispatch()
    const active = useSelector(state => state.filters.pageNumber)

    function renderItems() {
        let allPages = Math.ceil(productsCount / productsPerPage)
        // let active = 2;
        let items = [];
        for (let number = 1; number <= allPages; number++) {
            items.push( 
                 <li key={number} className= {number === active ? "page-item active" : "page-item"} 
                 onClick={
                    // () => console.log("Hello page", number)
                 ()=>  dispatch(setPageNumber(number))
                 }><span className="page-link"  
                 >{number}</span>
                 </li>
            );
        }
        return items
    }


    return (
        <Pagination className="justify-content-center">{renderItems()}</Pagination>
    )
}

export default Pagination2