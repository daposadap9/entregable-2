import {useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'
import MyLoader from './components/MyLoader'
import { motion } from 'framer-motion';


const API_KEY="ef94210d70170ec528bcc4c93b3efc05"


function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temps, setTemps] = useState();
  const [isCelsius, setIsCelsius]= useState(true)

  const success = (e) =>{
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude,
    }
    setCoords(newCoords)
  }
  const changeUnitTemp = () => setIsCelsius(!isCelsius)
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(()=>{
    if(coords){
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    axios.get(URL)
    .then(res => {
      setTimeout(()=>{
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(2);
        const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
        const newTemps ={
          celsius,
          fahrenheit
        }
        setTemps(newTemps)
      },1000)
    })
    .catch(err => console.log(err))
    }
    
  },[coords])



  return (
  <div
  
  className="App">
    {
      weather ?(
        <WeatherCard
          weather={weather} 
          temps={temps} 
          isCelsius={isCelsius} 
          changeUnitTemp={changeUnitTemp}></WeatherCard>
      ) : <MyLoader/>
    } 
    </div>
  )
}

export default App
