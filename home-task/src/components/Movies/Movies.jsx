import "./Movies.scss"
import Item from "../item/Item";
import { useEffect, useState } from "react";


function Movies({ filter, currentPage, callbackTotalPage }) {

    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])
    const [genreArrayApi, setGenreArrayApi] = useState([])

    useEffect(() => {
        async function getApi() {
            try {
                setLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2ad4c21559cca937567a0b161d458d3f&language=en-US&with_genres=${filter}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`)
                const obj = await response.json()
                setMovies(obj.results)
                callbackTotalPage(obj.total_pages)
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getApi()
    }, [currentPage, filter])

    useEffect(() => {
        async function getGenreApi() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2ad4c21559cca937567a0b161d458d3f&language=en-US`)
                const obj = await response.json()
                setGenreArrayApi(obj.genres)
            } catch (error) {
                console.log(error);
            }
        }
        getGenreApi()
    }, [])


    function convertingGenres(arr) {
        const normalGenres = [];
        for (let num = 0; num < arr.length; num++) {
            for (let index = 0; index < genreArrayApi.length; index++) {
                if (arr[num] === genreArrayApi[index].id) {
                    normalGenres.push(`${genreArrayApi[index].name}`)
                }
            }
        }
        return normalGenres
    }

    if (loading) {
        return <h3>Loading....</h3>
    } else {
        return (
            <div className="content">
                {!movies.length ?
                    <div className="result-found">No results found!</div> :
                    movies.map(el =>
                        <Item
                            key={el.id}
                            title={el.title}
                            date={el.release_date}
                            genre={convertingGenres(el.genre_ids)}
                            picture={el.backdrop_path}
                        />)}
            </div>
        )
    }
}

export default Movies;