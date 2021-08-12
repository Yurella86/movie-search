import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Select from 'react-select';
import './App.scss';
import Item from './item/Item';
import Pagination from './pagination/Pagination';

function App() {

  const apiKey = '2ad4c21559cca937567a0b161d458d3f'

  const [array, setArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [genreArrayApi, setGenreArrayApi] = useState([])
  const [selectFilter, setSelectFilter] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalFilms, setTotalFilms] = useState(1)
  const [postPageFilms] = useState(10)
  const [optionsFilter] = useState([
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Family', label: 'Family' },
    { value: 'Horror', label: 'Horror' },
  ])

  function arrayTenFilms() {
    const lastFilmIndex = currentPage * postPageFilms
    const firstFilmIndex = lastFilmIndex - postPageFilms
    const currentFilms = array.slice(firstFilmIndex, lastFilmIndex)
    return currentFilms
  }

  function filterArray(el) {
    let filteredGenres = getChangeGenres(el.genre_ids)
    el.genre_ids = filteredGenres
    for (let index = 0; index < selectFilter.length; index++) {
      const element = selectFilter[index].value;
      const result = el.genre_ids.some((x) => x === element)
      if (result) {
        return el
      }
    }
  }

  async function getApi(p) {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${p}&with_watch_monetization_types=flatrate`)
      const obj = await response.json()
      setTotalFilms(obj.total_results)
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

  function getChangeGenres(arr) {
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

  function getItems() {
    return array.map(el =>
      <Item
        key={el.id}
        title={el.title}
        date={el.release_date}
        genre={getChangeGenres(el.genre_ids)}
        picture={el.backdrop_path}
      />)
  }

  function handleChangeFilter(e) {
    setSelectFilter(e);
  }

  useEffect(() => {
    getGenreApi()
  }, [])

  useEffect(() => {
    getApi(currentPage)
  }, [currentPage, selectFilter]);

  if (loading) {
    return <h3>Loading....</h3>
  }
  return (<BrowserRouter>
    <div className="wrapper">

      <header>
        <hi>movies</hi>
        <div className="search">
          <Select
            onChange={handleChangeFilter}
            name="genre"
            isMulti
            options={optionsFilter}
          />

        </div>
      </header>

      <div className="content">

        <Switch>
          <Route path={`/page_${currentPage}`}>
            {getItems()}
          </Route>
        </Switch>

      </div>

      <div className="pagination">
        <Pagination
          filmsPerPage={postPageFilms}
          totalFilms={totalFilms}
          paginate={(pageNumberApi) => setCurrentPage(pageNumberApi)} />
      </div>
    </div >
  </BrowserRouter>
  );
}

export default App;


//{selectFilter ?
//  array.filter(el => filterArray(el)).map(el =>
//    <Item
//      key={el.id}
//      title={el.title}
//      date={el.release_date}
//      genre={el.genre_ids}
//      picture={el.backdrop_path}
//    />) :
//  array.map(el =>
//    <Item
//      key={el.id}
//      title={el.title}
//      date={el.release_date}
//      genre={getChangeGenres(el.genre_ids)}
//      picture={el.backdrop_path}
//    />)}