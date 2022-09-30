//Váriaveis e seleções de elementos HTMl key-29dee0cde2e8de785501728e8861de9e

const apiKei = "d9c8003e68cdca1985da485514d386dd"
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

    const apiWeatherURL = `https://api.openweathermap.org/data/3.0!/onecall?q=${city}&units=metric&appid=${apiKei}&lang=pt_br`

    const res = await fetch(apiWeatherURL).catch(error => console.log(error))
    const data = await res.json()

    console.log(res)

    return data
}

const showWeatherData = async(city) => {
    console.log(city)

    const data = await getWeatherData(city)

    cityElement.innerText = data.name
    countryElement.setAttribute(
        "src",
        `https://countryflagsapi.com/png/${data.sys.country}`
    )
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].description}.png`
    )
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.main.speed} km/h`

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