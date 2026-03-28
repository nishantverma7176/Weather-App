const apiKey = "4aefc30af66f27b3a293601af02ad5cd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiUrlCoords = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&units=metric&appid=${apiKey}`);
    
    if(response.status == 404){
        alert("Please Enter a valid city name")
    }
    else{
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
            document.querySelector(".wind").innerHTML = data.wind.speed+"km/h";

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png";
            }
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
            }
        }
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const response = await fetch(apiUrlCoords + `&lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
            document.querySelector(".wind").innerHTML = data.wind.speed+"km/h";

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }, () => {
            alert("Location access denied");
        });
    } 
    else {
        alert("Geolocation not supported");
    }
}

function handleSearch(){
    if(searchBox.value.trim() === ""){
        getLocationWeather();
    } else {
        checkWeather(searchBox.value);
   }
    searchBox.value = "";
}

searchBtn.addEventListener("click", handleSearch);
searchBox.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        handleSearch();
    }
});
window.onload = () => {
    getLocationWeather();
};