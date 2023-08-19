const todayName = document.getElementById("today_date_day_name");
const todayNumber = document.getElementById("today_date_day_number");
const todayMonth = document.getElementById("today_date_month");
const todayLocation = document.getElementById("today_location");
const todayTemp = document.getElementById("today_temp");
const todayImg = document.getElementById("today_img");
const todayText = document.getElementById("today_text");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("wind_direction");

const nextDay = document.getElementsByClassName("next_day_name");
const nextMaxTemp = document.getElementsByClassName("next_max_temp");
const nextMinTemp = document.getElementsByClassName("next_min_temp");
const nextImg = document.getElementsByClassName("next_day_img");
const nextText = document.getElementsByClassName("next_day_text");

let searchInput = document.getElementById("search");

// fetch API data
async function getData(cityName) {
  let Data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=815c8b122f2e44eb8d932932231708&q=${cityName}&days=3`
  );
  let weatherData = await Data.json();

  return weatherData;
}

// today data
function displayTodayData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayImg.setAttribute("src", data.current.condition.icon);
  todayText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  windDirection.innerHTML = data.current.wind_dir;
}

// next day data
function displayNextdayData(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i + 1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextText[i].innerHTML = forecastData[i + 1].day.condition.text;
    nextImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
  }
}

// start app

async function start(city = "cairo") {
  let weatherData = await getData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayNextdayData(weatherData);
  }
}

start();

searchInput.addEventListener("input", function () {
  start(searchInput.value);
});
