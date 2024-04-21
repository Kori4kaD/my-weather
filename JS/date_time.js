function getDate(){
  let today = new Date();

  // Извлекаем день, месяц и год
  let day = today.getDate();
  let month = today.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
  let year = today.getFullYear();
  
  // Форматируем дату в строку в нужном формате
  let formattedDate = day + '.' + month + '.' + year;
  return formattedDate;
}


/***************Отримуємо день тижня************************************** */

function getDayOfWeek(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const dayOfWeekNumber = date.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekString = daysOfWeek[dayOfWeekNumber];

  return dayOfWeekString;
}


/****************Отримуємо день і мясяць для виводу на сторінку************** */
function getDateAndMonth(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDate();
  const monthNumber = date.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[monthNumber];
  const formattedDate = `${day} ${monthName}`;
  return formattedDate;
}


/***************Отримуємо значення часу кінця доби********************* */
function getDateToEndDay(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  // Устанавливаем время на 23:59:00.000
  date.setHours(23, 59, 0, 0);
  const endDay = Math.floor(date.getTime() / 1000);

  return endDay;
}


/**************Отримуємо час початку доби *********************** */
function getStartOfDay(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  date.setHours(0, 0, 0, 0);
  const startOfDayUnix = Math.floor(date.getTime() / 1000);
  return startOfDayUnix;
}


/*************Отримуємо час для виводу на сторінку *****************************/
function getHourAndMinutes(unixTimestamp) {
  // Вилучаємо із формата юнікс час в годинах і хвилинах для виводу на сторінку
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // Формуємо час для відображення
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  return formattedTime;
}
