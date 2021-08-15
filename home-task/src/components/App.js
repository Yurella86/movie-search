import React, { useEffect, useState } from 'react';
import './App.scss';
import Filter from './Filter/Filter';
import Movies from './Movies/Movies';
import Pagination from './Pagination/Pagination';

function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filterArray, setFilterArray] = useState([])
  const [numbersFilter, setNumbersFilter] = useState([])

  function getFilter() {
    return numbersFilter
  }

  useEffect(() => {
    let arrayNumbers = []
    if (filterArray.length >= 1) {
      for (let index = 0; index < filterArray.length; index++) {
        const element = filterArray[index];
        arrayNumbers.push(element.value)
      }
      setNumbersFilter(arrayNumbers)
    }
  }, [filterArray])

  useEffect(() => {
    getFilter()
  }, [numbersFilter])

  return (
    <div className="wrapper">
      <div className="header">
        <h2>movies</h2>

        <Filter
          callbackArrayFilters={(arr) => setFilterArray(arr)} />
      </div>

      <Movies
        filter={getFilter()}
        currentPage={currentPage}
        callbackTotalPage={(num) => setTotalPages(num)} />


      <div>
        <Pagination
          totalPage={totalPages}
          callbackNumber={(num) => setCurrentPage(num)}
        />
      </div>

    </div>
  )
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