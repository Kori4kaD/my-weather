const weatherBlock = document.querySelector("#weather");

function getWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherstatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const sunrise = new Date(data.sys.sunrise * 1000);
  const rise_hours = sunrise.getHours();
  const rise_minutes = sunrise.getMinutes();
  const sunset = new Date(data.sys.sunset * 1000);
  const set_hours = sunset.getHours();
  let set_minutes = sunset.getMinutes();
  set_minutes = set_minutes.toString();
  if (set_minutes.length === 1) {
    set_minutes = `0${set_minutes}`;
  }
  let searchValue = document.querySelector("#search");
  searchValue.value = location;
  let duration_hour = Math.floor((sunset - sunrise) / 1000 / 60 / 60);
  let duration_min = Math.floor(
    (sunset - sunrise) / 1000 / 60 - duration_hour * 60
  );
  

  const templateCurrent = `
  <div class="cur_date">
      <h4>CURRENT WEATHER</h4>
      <h4>${getDate()}</h4>
    </div>
  <div class="weather__header">
    
    <div class="weather__main">
      <div class="weather__icon">
      
      <img src="images/${weatherIcon}.png" alt="${weatherstatus}" />
      </div>
      <div class="weather__status"><p>${weatherstatus}</p></div>
    </div>
    <div class="temp">        
      <div class="weather__temp"><p>${temp}&degC</p></div>
      <div class="weather__feels-like"><p>Feels like: ${feelsLike}&deg</p></div>
    </div>
    <div class="sun">
      <div class="sunrise"><p> Sunrise:${rise_hours}:${rise_minutes}</p></div>
      <div class="sunset"><p> Sunset: ${set_hours}:${set_minutes}</p></div>
      <div class="dur"><p> Duration: ${duration_hour}h ${duration_min}min</p></div>

    </div>  
  </div>`;

  weatherBlock.innerHTML = templateCurrent;
}

function getWeatherHourly(data, timeStart, idBlock, idParent, clas) {
  const block = document.getElementById(idBlock);
  block.remove();
  const hourlyBlock = document.createElement("div");
  hourlyBlock.className = clas;
  hourlyBlock.id = idBlock;
  const parent = document.getElementById(idParent);
  parent.appendChild(hourlyBlock);
  let one_Hour;
  let time;
  let icon;
  let forecastHourly;
  let tempHourly;
  let tempFeel;
  let wind;
  const one_Hour_title = document.createElement("div");
  one_Hour_title.className = "oneHour";
  one_Hour_title.innerHTML = `
  <div class="day">${getDayOfWeek(timeStart)}</div>
       <img/>
       <div class="forecastDay"> Forecast</div>
      <div class="tempDay">Temp(&degC)</div>
      <div class="feelDay">RealFeel</div>
      <div class="windDay">Wind(km/h)</div>
  `;
  hourlyBlock.appendChild(one_Hour_title);
  let count = 0;

  data.forEach(function (element) {
    if (
      element.dt > getStartOfDay(timeStart) &&
      element.dt < getDateToEndDay(timeStart) &&
      count < 7
    ) {
      count++;
      one_Hour = document.createElement("div");
      one_Hour.className = "oneHour";
      time = document.createElement("p");
      const timeOfHourly = getHourAndMinutes(element.dt);
      time.textContent = timeOfHourly;
      icon = document.createElement("div");
      
      icon.innerHTML = `<img src="images/${element.weather[0]["icon"]}.png" alt="" />`;
      forecastHourly = document.createElement("p");
      forecastHourly.textContent = element.weather[0]["main"];
      tempHourly = document.createElement("p");
      
      tempHourly.textContent = Math.floor(element.temp) ? `${Math.floor(element.temp)}°` : `${Math.floor(element.main.temp)}°`;
      tempFeel = document.createElement("p");
      tempFeel.textContent = Math.floor(element.feels_like)
        ? `${Math.floor(element.feels_like)}°`
        : `${Math.floor(element.main.feels_like)}°`;
      wind = document.createElement("p");
      if (element.wind_speed || element.wind.speed){
        wind.textContent = element.wind_speed ? element.wind_speed : element.wind.speed;
      }
      else {
        wind.textContent ="";
      }

      one_Hour.appendChild(time);
      one_Hour.appendChild(icon);
      one_Hour.appendChild(forecastHourly);
      one_Hour.appendChild(tempHourly);
      one_Hour.appendChild(tempFeel);
      one_Hour.appendChild(wind);
      hourlyBlock.appendChild(one_Hour);
    }
  });
}
// вивід прогнозу нв 5 днів
function getForecast5days(arr) {
  let arr5Days = arr.splice(0, 5);
  const block5days = document.getElementById("weather5day");
  block5days.remove();
  const block5 = document.createElement("div");
  block5.className = "weather5day";
  block5.id = "weather5day";
  const cont = document.getElementById("5day");
  cont.prepend(block5);

  arr5Days.forEach(function (element) {
    const oneDayOf5 = document.createElement("div");
    oneDayOf5.className = "oneDayOf5";
    oneDayOf5.id = "oneDayof5";
    oneDayOf5.setAttribute("data_date", `${element.dt}`);
    oneDayOf5.onclick = function() {
      const timestamp = parseInt(this.getAttribute("data_date"), 10);
      getWeatherHourly(
        savedHourlyData,
        timestamp,
        "hourlyBlock5days",
        "5day",
        "hourly5day"
      );
    };
    /*предыдущая версия онклик*/
    // function handleClick() {
    //   const timestamp = parseInt(oneDayOf5.getAttribute("data_date"), 10);
    //   getWeatherHourly(
    //     savedHourlyData,
    //     timestamp,
    //     "hourlyBlock5days",
    //     "5day",
    //     "hourly5day"
    //   );
    // }
    // // Навішуємо click на елемент
    // oneDayOf5.addEventListener("click", handleClick);

    /*запасная версия*/
    // document.addEventListener("click", function(event) {
    //   if (event.target.classList.contains("oneDayOf5")) {
    //     const timestamp = parseInt(event.target.getAttribute("data_date"), 10);
    //     getWeatherHourly(
    //       savedHourlyData,
    //       timestamp,
    //       "hourlyBlock5days",
    //       "5day",
    //       "hourly5day"
    //     );
    //   }
    // });

    const dayOfWeek = getDayOfWeek(element.dt);
    const dateDayAndMonth = getDateAndMonth(element.dt);
    const dayIcon = element.weather[0].icon;
    const tempDay = Math.floor(element.temp.day);
    const statusDay = element.weather[0].description;

    oneDayOf5.innerHTML = `
      <h4>${dayOfWeek}</h4>
      <p>${dateDayAndMonth}</p>
      <img src="images/${dayIcon}.png" alt="${dayIcon}"/>
      
      <p>${tempDay}&degC</p>
      <p>${statusDay}</p>
    `;

    block5.appendChild(oneDayOf5);
  });
}
