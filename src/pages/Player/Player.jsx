import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const {id} = useParams();

  const navigate= useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGViZGY4OTYwYmZjZmQwMzhlNGRkODZkYmMwZGJhYyIsIm5iZiI6MTc2MTg0NjE4Mi4wNjIsInN1YiI6IjY5MDNhM2E2NmRhYjM3NzVhYjM0Y2VmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d38sEADjL-Ki1gOXqkE2FxaNkIE4pChb-l89trFF5bc'
  }
};
 useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
 },[])

  return (
    <div className='Player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`}
       title="Trailer" frameBorder="0"></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0,10)}</p> 
         <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
       
      </div>
    </div>
  )
}

export default Player
