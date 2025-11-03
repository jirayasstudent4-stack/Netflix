import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import card_data from'../../assets/cards/Cards_data.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const TitleCards = ( {title,category}) => {

  const [apiData,setApiData]=useState([])

  const cardsRef=useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGViZGY4OTYwYmZjZmQwMzhlNGRkODZkYmMwZGJhYyIsIm5iZiI6MTc2MTg0NjE4Mi4wNjIsInN1YiI6IjY5MDNhM2E2NmRhYjM3NzVhYjM0Y2VmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d38sEADjL-Ki1gOXqkE2FxaNkIE4pChb-l89trFF5bc'
  }
};
  const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
  }
 useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
}, [category]);

  return (
    <div className='title-cards'>
      <h2> {title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
        {apiData.map((card,index)=>{
       return <Link to={`/player/${card.id}`} className="card" key={index}>
        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
        <p>{card.original_title}</p>
       </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards;
