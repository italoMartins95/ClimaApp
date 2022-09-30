//Váriaveis e seleções de elementos HTMl key-29dee0cde2e8de785501728e8861de9e

const apiKei = "8dfde8a8"
const apiCountryUrl = "https://countryflagsapi.com/png/"

const cityInput = document.getElementById('city-input')
const searchBtn = document.getElementById('search')

const cityElement = document.getElementById('city')
const countryElement = document.getElementById('country')
const tempElement = document.querySelector('#temperature span')
const descElement = document.getElementById('description')
const weatherIconElement = document.getElementById('weather-icon')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherConteiner = document.getElementById('weather-data')

//Funções

const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.hgbrasil.com/weather?key=${apiKei}a8&city_name=${city}`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(res)

    return data
}

const showWeatherData = async(city) => {
    console.log(city)

    const data = await getWeatherData(city)

    cityElement.innerText = data.city_name
    countryElement.setAttribute(
        "src",
        `https://countryflagsapi.com/png/br` // <-Modificar essa parte posteriormente
    )
    tempElement.innerText = parseInt(data.temp)
    descElement.innerText = data.description
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.description}.png`
    )
    humidityElement.innerText = `${data.humidity}%`
    windElement.innerText = `${data.wind_speedy} km/h`

    weatherConteiner.classList.remove('hiden')
}

//Eventos

searchBtn.addEventListener('click' , ()=> {
   const city = cityInput.value

   showWeatherData(city)
})

cityInput.addEventListener('keyup' , (e) => {
    if(e.code === "Enter"){
        const city = e.target.value

        showWeatherData(city)
    }
})