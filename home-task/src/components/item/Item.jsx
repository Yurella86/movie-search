import { useEffect, useState } from 'react'
import './Item.scss'

function Item({ title, date, picture, genre, loading }) {

    const [genres, setGenres] = useState([])

    function year() {
        const regExYear = date.match(/^[0-9]*/gm)
        return regExYear
    }
    if (loading) {
        return <h3>Loading....</h3>
    }
    return (
        <div className="item">
            <div className="item-img">
                <img src={picture} alt="image" />
            </div>
            <div className="item-description">
                <div className="title">{title}</div>
                <div className="year">{year()} </div>
                <div className="genre">
                    {genre.map(el => `${el}, `)}
                </div>
            </div>
        </div>
    )
}

export default Item;