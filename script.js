const city = document.querySelector("#city")
const date = document.querySelector("#date")
const icon = document.querySelector("#icon")
const description = document.querySelector("#description")
const temperature = document.querySelector("#temperature")

const colors = 
 {
 "-60": "#dce9fa",
 "-55": "#d3e2f7",
 "-50": "#cbdbf4",
 "-45": "#c0d4ef", 
 "-40": "#b8cdea",
 "-35": "#afc6e6",
 "-30": "#a7bfe3",
 "-25": "#9cb8df",
 "-20": "#94b0d5",
 "-15": "#87a5d0",
 "-10": "#7e9bc2",
  "-5": "#7790b8",
   "0": "#607ba6",
   "5": "#56719c",
  "10": "#4d6591",
  "15": "#405d88",
  "20": "#39517b",
  "25": "#2f4775",
  "30": "#254370",
  "35": "#264e77",
  "40": "#295b80",
  "45": "#296689",
  "50": "#287494",
  "55": "#428190",
  "60": "#648d89",
  "65": "#879a84",
  "70": "#aba87d",
  "75": "#c2ab75",
  "80": "#c39c61",
  "85": "#c38a53",
  "90": "#bd704d",
  "95": "#ae4d4b",
 "100": "#9d2a4c",
 "105": "#8b1d40",
 "110": "#711431",
 "115": "#570c25",
 "120": "#3e0216"
}

const icons = {
  "Clear"  : "./icons/day.svg",
  "Clouds" : "./icons/cloudy.svg",
  "Snow"   : "./icons/snowy-6.svg",
  "Rain"   : "./icons/rainy-6.svg",
  "Drizzle": "./icons/rainy-7.svg",
  "Thunderstorm" : "./icons/thunder.svg",
  "Mist" : "./icons/rainy-7.svg",
  "Smoke": "./icons/rainy-7.svg",
  "Haze" : "./icons/rainy-7.svg",
  "Dust" : "./icons/rainy-7.svg",
  "Fog" : "./icons/rainy-7.svg",
  "Sand" : "./icons/rainy-7.svg",
  "Ash" : "./icons/rainy-7.svg",
  "Squall" : "./icons/rainy-7.svg",
  "Tornado" : "./icons/cloudy.svg"
}

function findMyCoordinates() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude)
    },
    (err) => { 
      alert(err.message)
    })
  } else {
    alert("Geolocation is not supported by your browser")
  }
}

function getWeather(lat, lon){
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=16a2314e91b166c8c3c5b3c33539f22b`;

  fetch(endpoint)

  .then(response => {
    if (response.status !== 200) throw Error(response.statusText);
    return response.json();
  })
  .then(data => {
    console.log(data)
    getBackgroundColor(data.main.temp)
    getCity(data.name)
    getDate()
    getDescription(data.weather[0].main)
    getWeatherIcon(data.weather[0].main)
    getTemperature(data.main.temp)
  })
  .catch(error => console.log(error));
}

function getBackgroundColor(temp){
  const keys = Object.keys(colors).sort((a, b) => a - b)
  let color = ""
  if(temp <= -60){
    color = colors[keys[0]]
  } else if(temp >= 120) {
    color = colors[keys[keys.length - 1]]
  } else {
    for(let i = 0; i < keys.length; i++){
      if(temp >= keys[i] && temp < keys[i + 1])
        color = colors[keys[i]]  
    }
  } 
  document.body.style.background = `radial-gradient(ellipse at center, ${color} 0%, #000000 100%)`
}

function getCity(cityName){
  city.textContent = cityName
}

function getDate(){
  let cDate = new Date()
  cDate = cDate.toString().split(" ")
  date.textContent = cDate[0] + " " + cDate[1] + " " + cDate[2] + " " + cDate[3]
}

function getDescription(weatherDescription){
  description.textContent = weatherDescription 
}

function getWeatherIcon(weatherDescription){
  icon.src = icons[weatherDescription]
}

function getTemperature(temp){
  temperature.innerHTML = Math.floor(temp) + "&#8457;"
}

window.onload = function(){
  findMyCoordinates()
}
