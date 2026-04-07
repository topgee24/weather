import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/searches.png'
import clear_icon from '../assets/sunny.png'
import cloud_icon from '../assets/clouds.png'
import humidity_icon from '../assets/humiditys.png'
import snow_icon from '../assets/snowy.png'
import rain_icon from '../assets/rains.png'
import drizzle_icon from '../assets/drizzles.png'
import wind_icon from '../assets/winds.png'


const Weather = () => {

  const inputRef = useRef()
const [weatherData, setWeatherData] = useState(false);
const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon, 
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon

}



  const search = async (city) => {
    console.log("Searching for:", city);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clear_icon; 

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  }

  useEffect(() => {
    search("Accra")
  },[])
  return (
    <div className='weather'>
        <div className='search-container'>
    <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search...' />
            <img className='search_icon' src={search_icon} alt="search icon" onClick={() => search(inputRef.current.value)}/>
            
        </div>
        </div>

        <img src={weatherData.icon} alt="" className='' />
        <p className='temperature'>{weatherData.temperature}°C </p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p className='statements'>{weatherData.humidity} %</p>
              <span className='temps'>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p className='statements'>{weatherData.windSpeed} km/h</p>
              <span className='temps'>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather
