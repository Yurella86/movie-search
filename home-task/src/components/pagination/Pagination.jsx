import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

function Pagination({ totalPage, callbackNumber }) {

    function handleChangePage({ selected }) {
        const showNumberPage = selected + 1
        callbackNumber(showNumberPage)
    }

    return (
        <div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={totalPage}
                onPageChange={handleChangePage}
                containerClassName={"paginationsBttns"}
                previousLinkClassName={"previosBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"pagination-disabled"}
                activeClassName={"acttive"}
            />
        </div>
    )
}

export default Pagination;