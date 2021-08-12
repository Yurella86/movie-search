import { useEffect, useState } from "react"
import "./Pagination.scss"

function Pagination({ filmsPerPage, totalFilms, paginate }) {

    const [numberPage, setNumberPage] = useState(1)
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalFilms / filmsPerPage); i++) {
        pageNumber.push(i)
    };

    function changePage() {
        paginate(numberPage)
    }

    useEffect(() => {
        changePage()
    }, [numberPage])
    return (
        <div className="wrapper-pagination">
            <ul className="numbers">
                <li className="previous"
                    onClick={() => {
                        setNumberPage(numberPage > 1 ? numberPage - 1 : numberPage)
                    }}
                >Previous</li>
                {
                    pageNumber.map(number => (
                        <li key={number} className={`page`}
                            onClick={() => {
                                setNumberPage(number)
                                paginate(numberPage)
                            }
                            } >

                            {number}

                        </li>
                    ))
                }
                <li className="next" onClick={() => {
                    numberPage < pageNumber.length ? setNumberPage(numberPage + 1) : setNumberPage(numberPage)
                }}>Next</li>
            </ul>
        </div >
    )
}

export default Pagination;