import axios from "axios"

import { keyAPI } from "./key"

const base_URL = `http://api.weatherstack.com/current?access_key=${keyAPI}`

export async function getInfoWeather(query) {
  const response = await axios.get(`${base_URL}&query=${query}`)
  
  if (response.status === 200) {
    const responseData = response.data
    return {
      city: responseData.location.name,
      country: responseData.location.country,
      localTime: responseData.location.localtime,
      temperature: responseData.current.temperature,
      windSpeed: responseData.current.wind_speed,
      precip: responseData.current.precip,
      humidity: responseData.current.humidity,
      cloudcover: responseData.current.cloudcover
    }
  } else {
    console.log(response.statusText)
    return null
  }
}