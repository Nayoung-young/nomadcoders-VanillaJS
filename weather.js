const weather = document.querySelector(".js-weather");

const API_KEY = "7758d6680c3b9680c37ade48ca35c8e3";
const COORDS = "coords";


function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    const temp = json.main.temp;
    const place = json.name;
    weather.innerText = `${temp}°C @ ${place}`;
  });

}

function saveCoords(cordsObj){
  localStorage.setItem(COORDS, JSON.stringify(cordsObj));

}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude, //latitude: latitude
    longitude //longitude: longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoErr(position) {
  console.log("cannot get position");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
