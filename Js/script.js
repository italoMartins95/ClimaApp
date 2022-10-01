//Váriaveis e seleções de elementos HTMl key-29dee0cde2e8de785501728e8861de9e

const apiKei = "29dee0cde2e8de785501728e8861de9e"
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

/*
 *Esta parte deveria ser a forma de consulta a previsão do tempo. Porém encontrei muitas dificuldades de obter uma resposta
 *da API (openweathermap), sempre tinha um retorno de ERRO 401:Ñ autorizado e não consegui resolver esse problema.
 *Por isso optei usar outra API mais simples, porem com retorno menos detalhado.

const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/3.0!/onecall?q=${city}&units=metric&appid=${apiKei}&lang=pt_br`

    console.log(apiWeatherURL)

    const res = await fetch(apiWeatherURL).catch(error => console.log(error))
    const data = await res.json()

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
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    )
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.main.speed} km/h`

    weatherConteiner.classList.remove('hiden')
}
*
*/

//Abaixo, um metodo usando uma API alternativa... HgBrasil

function getWeatherCity(city){

    fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=2cdeb01d&city_name=${city}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data.results)
                                cityElement.innerText = data.results.city
                                countryElement.setAttribute(
                                    "src",
                                    `https://countryflagsapi.com/png/br`
                                )
                                tempElement.innerText = data.results.temp
                                descElement.innerText = data.results.description
                                humidityElement.innerText = `${data.results.humidity}%`
                                windElement.innerText = data.results.wind_speedy
                                weatherConteiner.classList.remove('hiden')
                                weatherIconElement.classList.add('hiden') // Elemento escondido pois a API não possui icones
                                })
                            .catch(error => console.log(error))
}

//Eventos

searchBtn.addEventListener('click' , ()=> {
   const city = cityInput.value

   //showWeatherData(city)

   getWeatherCity(city)
})

cityInput.addEventListener('keyup' , (e) => {
    if(e.code === "Enter"){
        const city = e.target.value

        //showWeatherData(city)

        getWeatherCity(city)
    }
})