import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${city}`
    axios.get(url)
      .then(response=>{
        setWeather(response.data)
      })
  }, [city])
  return Object.keys(weather).length > 0 ? (
    <div>
      <h3>Weather in {city}</h3>
      <span><strong>Temperature : </strong>{weather.current.temperature} degrees Celsius</span><br />
      <span><strong>Wind : </strong>{weather.current.wind_speed} km/h {weather.current.wind_dir}</span><br />
      {weather.current.weather_icons
        .map(iconSource=>
          <img key={iconSource} src={iconSource} alt="weather" />  
        )}
    </div>
  )
  : <div></div>
}

const CountryData = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <h3>Capital: {country.capital}</h3>
    <h3>Population: {country.population}</h3>
    <h3>Languages</h3>
    {country.languages.map(language => (
      <div key={language.name}><span>{language.name}</span><br /></div>
    ))}
    <br />
    <img src={country.flag} alt={`${country.name} flag`} height='300px' />
    <Weather city={country.capital} />
  </div>
)

const DisplayCountries = ({ filter, filteredCountries, handleShow }) => (
  <div>
    {
      filter === '' 
      ? <div></div> 
      : filteredCountries.length > 10 
        ? <span>Too many matches, specify further</span>
        : filteredCountries.length > 1 
          ? filteredCountries
            .map(country => 
              (<div key={country.name}>
                {country.name} <button id={country.name} onClick={handleShow}>show</button><br />
              </div>))
          : filteredCountries.length === 1 
            ? <CountryData country={filteredCountries[0]} />
            : <span>no results found</span>
    }
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleShow = (event) => {
    setFilter(event.target.id)
  }
  const filteredCountries = countries.filter(country => country.name.toLowerCase().startsWith(filter.toLowerCase()))
  return (
    <div>
      Find countries: <input onChange={handleFilterChange} value={filter} />
      <DisplayCountries 
        filter={filter} 
        filteredCountries={filteredCountries} 
        handleShow={handleShow} />
    </div>
  )
}

export default App;
