import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './App.scss';
import Item from './item/Item';
import Pagination from './pagination/Pagination';

function App() {

  const apiKey = '2ad4c21559cca937567a0b161d458d3f'

  const [array, setArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [genreArrayApi, setGenreArrayApi] = useState([])
  const [selectFilter, setSelectFilter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPage, setPostPage] = useState(10)
  const [options, setOptions] = useState([
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Family', label: 'Family' },
    { value: 'Horror', label: 'Horror' },
  ])

  async function getApi() {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
      const obj = await response.json()
      setArray(obj.results);
      setLoading(false);
    } catch (error) {
      console.log(error);

    }

  }

  async function getGenreApi() {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      const obj = await response.json()
      setGenreArrayApi(obj.genres)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

  }

  function getGenres(arr) {
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

  function handleChange(e) {
    setSelectFilter(e);
  }

  useEffect(() => {
    getGenreApi()
    getApi()
  }, [])

  useEffect(() => {

  }, [setSelectFilter])

  if (loading) {
    return <h3>Loading....</h3>
  }
  return (
    <div className="wrapper">

      <header>
        <hi>movies</hi>
        <div className="search">
          <Select
            onChange={handleChange}
            name="genre"
            isMulti
            options={options}
          />

        </div>
      </header>

      <div className="content">

        {selectFilter ?
          array.filter((el) => {
            let filteredGenres = getGenres(el.genre_ids)
            el.genre_ids = filteredGenres
            for (let index = 0; index < selectFilter.length; index++) {
              const element = selectFilter[index].value;
              const result = el.genre_ids.some((x) => x === element)
              if (result) {
                return el
              }
            }
          }).map(el =>
            <Item
              key={el.id}
              loading={loading}
              key={el}
              title={el.title}
              date={el.release_date}
              genre={el.genre_ids}
              picture={el.backdrop_path}
            />) :
          array.map(el =>
            <Item
              key={el.id}
              loading={loading}
              title={el.title}
              date={el.release_date}
              genre={getGenres(el.genre_ids)}
              picture={el.backdrop_path}
            />)}
      </div>

      <div className="pagination">
        <Pagination />
      </div>
    </div>
  );
}

export default App;