import { useState } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Pagination.scss"

function Pagination({ filmsPerPage, totalFilms, paginate }) {

    const [pageNumberApi, setPageNumberApi] = useState(1)
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalFilms / filmsPerPage); i++) {
        pageNumber.push(i)
    };

    function changePage(pageNumberApi) {
        paginate(pageNumberApi)
    };

    return (
        <Router>
            <div className="wrapper-pagination">
                <ul className="numbers">

                    <li
                        className="previous"
                        onClick={() => {
                            pageNumberApi > 1 ? setPageNumberApi(pageNumberApi - 1) : setPageNumberApi(pageNumberApi)
                        }}>Previous
                    </li>

                    {pageNumber.map(number => (
                        <li
                            key={number}
                            onClick={() => {
                                setPageNumberApi(number)
                                changePage(number)
                            }} >
                            <Link to={`/page_${number}`} className="link">
                                {number}
                            </Link>
                        </li>
                    ))}

                    <li className="next" onClick={() => {
                        pageNumberApi < totalFilms ? setPageNumberApi(pageNumberApi + 1) : setPageNumberApi(pageNumberApi)
                    }}>Next</li>

                </ul>
            </div >
        </Router>
    )
}

export default Pagination;