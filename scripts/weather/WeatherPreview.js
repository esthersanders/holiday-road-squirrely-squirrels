import { getWeather, useWeather } from "./WeatherProvider.js"
import { getParkCoordinates } from "../parks/ParkProvider.js"

const contentTarget = document.querySelector(".weatherContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("parkSelected", customEvent => {
  const parkId = customEvent.detail.parkId
  const [ parkLatitude, parkLongitude ]  = getParkCoordinates(parkId)
  
  getWeather( parkLatitude, parkLongitude )
    .then( () => {
      const weather = useWeather()
      render(weather)
    })
})

const kelvinToFarenheit = ( tempKelvin ) => {
  return Math.round((tempKelvin-273.15)*(9/5)+32)
}


const render = ( weather ) => {
  contentTarget.innerHTML = `
    <div class="weather-component">
      <div>The current temperature in the park is ${kelvinToFarenheit(weather.current.temp)} degrees F
      </div>
      <div class="weather-five-day">
        ${fiveDayWeather(weather)}
      </div>
    </div>
    `
}

const fiveDayWeather = (weather) => {
  let allWeather = ''
  for (let i=0 ; i<5 ; i++ ) {
    allWeather += dailyWeather( i, weather)
  }
  return allWeather
}

const dailyWeather = (day, weather) => {
  const dayString = day.toString()
  const imagePath = `../../weatherImages/${weather.daily[dayString].weather["0"].icon}.png`
  const weatherDescription = `${weather.daily[dayString].weather["0"].description}`
  return `
    <div class="weather-day day-id-${dayString}">
      <div>Day-${dayString}</div>
      <div class="weather-daily-max">${kelvinToFarenheit(weather.daily[dayString].temp.max)}</div>
      <div class="weather-daily-min">${kelvinToFarenheit(weather.daily[dayString].temp.min)}</div>
      <div class="weather-daly-description">${weatherDescription}</div>
      <img src=${imagePath} alt="weather icon">
      </div>
      `
    }