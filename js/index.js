var inputChecked = document.querySelector("input");
var showTemp = document.querySelector(".tempr");
var faIcon = '<span class="fa fa-map-marker fa-1x"></span>';
var showCity = document.querySelector(".city");
var showCondition = document.querySelector(".condition");
var showWind = document.querySelector(".wind");
var showPres = document.querySelector(".pres");
var showIcon = document.querySelector(".weather-icon");
var showDate = document.querySelector(".today-date");
var weatherCondition = "";
var lon = "";
var lat  = "";

// Get current date
var date = new Date();
var currentDate = "";
var day = [];
var month = [];

month = [
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
  "December"
]

day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

currentDate = date.getDate() + " " + month[date.getMonth()] + ", " + day[date.getDay() -1];

showDate.innerHTML = currentDate;

// Get Location
function getLocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;

// Get Weather Data
  function getWeather(){
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&units=metric&APPID=9aeb972baaea4e885d33548853493fea", function(data){

    var tempRound = Math.floor(data.main.temp);
    var pressRound = Math.floor(data.main.pressure);
      
    showCity.innerHTML = faIcon + data.name + ", " + data.sys.country;
    showCondition.innerHTML = data.weather[0].main + " - " + data.weather[0].description;
    showWind.innerHTML = "Wind: " + data.wind.speed + "m/sec";
    showPres.innerHTML = "Pressure: " + pressRound + "hPa";
    showTemp.innerHTML = tempRound + "&#176" + "C";

   // Celsius to Fahrenheit and back
    function changeTemperature(){

       var tempF = Math.floor((data.main.temp * 9/5) + 32);
       showTemp.innerHTML = tempF + "&#176" + "F";

        if(inputChecked.checked === false){
            var tempC = Math.floor((tempF -32) * (5/9));
            showTemp.innerHTML = tempC + "&#176" + "C"; 
        }
    }

    inputChecked.onchange = function(){
      changeTemperature();
    };

    // Load weather icon 
      
      weatherCondition = data.weather[0].main;
        switch(weatherCondition){
          case "Clouds":
            showIcon.innerHTML = "<img src=" +  "http://gdurl.com/98ZU" + " alt='Clouds'" + ">";
            break;
          case "Rain":
            showIcon.innerHTML = "<img src=" +  "http://gdurl.com/QTjD" + " alt='Rain'" + ">";
            break;
          case "Drizzle":
            showIcon.innerHTML = "<img src=" +  "http://gdurl.com/C800" + " alt='Drizzle'" + ">";
            break;
          case "Clear":
            showIcon.innerHTML = "<img src=" +  "http://gdurl.com/hw4r" + " alt='Clear'" + ">";
            break;
          case "Thunderstorm":
            showIcon.innerHTML = "<img src=" +  "http://gdurl.com/2gSB" + " alt='Thunderstorm'" + ">";
            break;
          case "Snow":
            showIcon.innerHTML = "<img src=" +  "http://gdurl.com/3SZE" + " alt='Snow'" + ">";
        } 
      });
    
    }
   getWeather();
  });
}
getLocation();
