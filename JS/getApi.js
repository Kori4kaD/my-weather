const APIkey = "92318c5d9b887e39c183ff5a76c7abd4";

const today = Math.floor(new Date().getTime() / 1000);

// navigator.geolocation.getCurrentPosition(function (position) {
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   if ((lat, lon)) {
//     loadWeather(lat, lon);
//     loadWeatherDays(lat, lon);
//     load3hours5Days(lat, lon);
//   } else {
    let city = "Kyiv";
    loadWeatherCity(city);
//   }
// });

//запит отримання поточної погоди по обраному місту
async function loadWeatherCity(city) {
  let server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();
  
  if (response.ok) {
    let cityLat = responseResult.coord.lat;
    let cityLon = responseResult.coord.lon;
    getWeather(responseResult);
    loadWeatherDays(cityLat, cityLon);
  } else {
    let err = document.getElementById("today");
    err.innerHTML = `<img src="images/pngwing.com.png"/>`;
    let err5 = document.getElementById("5day");
    err5.innerHTML = `<img src="images/pngwing.com.png"/>`;
    console.log(response.statusText);
  }
}

//запит отримання поточної погоди по даним геолокаціїї
async function loadWeather(lat, lon) {
  let server = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${APIkey}`;

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}


let savedTime;

//запит отримання прогнозу на 1 год/8днів
async function loadWeatherDays(lat, lon) {
  let APIkeyAli = "e2dafe891a017ff3bc6e3d3755cb4ae2";
  let server =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIkeyAli +
    "&units=metric";

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    savedTime = responseResult.current.dt;
    getWeatherHourly(
      responseResult.hourly,
      today,
      "hourlyBlock",
      "today",
      "hourly"
    );
    getWeatherHourly(
      responseResult.hourly,
      today,
      "hourlyBlock5days",
      "5day",
      "hourly5day"
    );
    getForecast5days(responseResult.daily);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

//запит отримання прогнозу на 3 год/5днів
async function load3hours5Days(lat, lon) {
  let server = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&cnt=40&appid=${APIkey}`;

  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();
  if (response.ok) {
    savedHourlyData = responseResult.list;
  }
  else {
    weatherBlock.innerHTML = responseResult.message;
  }
}
