import './Item.scss'

function Item({ title, date, genre, picture }) {

    function year() {
        const regExYear = date.match(/^[0-9]*/gm)
        return regExYear
    }

    return (
        <div className="item">
            <div className="item-img">
                {
                    !picture ?
                        <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`} alt="" />
                        :
                        <img src={`https://image.tmdb.org/t/p/w500${picture}`} alt="" />
                }
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