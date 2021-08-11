import "./Pagination.scss"

function Pagination() {
    return (
        <div className="wrapper-pagination">
            <ul className="numbers">
                <li className="previous">Previous</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li className="next">Next</li>
            </ul>
        </div>
    )
}

export default Pagination;