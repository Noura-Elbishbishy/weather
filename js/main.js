var apiKey = 'your_new_api_key_here';
var apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`; 
//  HELP :) , lmfrod ahot al apiUrl dah bdl elly fe line 14, 3lshan yshtghl m3 ay had bl api key bt3o,bs lma b3ml keda mosh byshtghl
//lnytga eno mosh shghal 3la git hub m3 eno shghal m3aya wlahy:'(

function fetchWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    var myHttp = new XMLHttpRequest();
    myHttp.open('GET', `http://api.weatherapi.com/v1/forecast.json?key=43dd25338f284b699f8132118242706&q=${city}&days=3&aqi=no&alerts=no`);
    myHttp.send();

    myHttp.addEventListener('load', function () {
        var response = JSON.parse(myHttp.responseText); // Parse the entire response
        var currentData = response.current; // Access current weather data
        var forecastData = response.forecast.forecastday; // Access forecast data for the next 3 days

        displayCurrentData(currentData);
        displayForecastData(forecastData);
    });
}

function displayCurrentData(currentData) {
    var cartona = `
        <div class="card h-100 w-100">
            <div class="card-body">
                <h2 id="temp_c">${currentData.temp_c} °C</h2>
                <p id="text">${currentData.condition.text}</p>
                <img id="icon" src="https:${currentData.condition.icon}" alt="Weather icon" class="img-fluid">
                <div class="d-flex justify-content-between mt-3">
                    <div id="wind_mph" class="w-100"><p>Wind speed: ${currentData.wind_mph} mph</p></div>
                    <div id="humidity" class="w-100"><p>Humidity: ${currentData.humidity}%</p></div>
                    <div id="cloud" class="w-100"><p>Cloud cover: ${currentData.cloud}%</p></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('rowData').innerHTML = cartona;
}

function displayForecastData(forecastData) {
    var cartona2 = forecastData.map(day => `
        <div class="col-md-4">
            <div class="card m-1 h-100">
                <div class="card-body">
                    <h3 id="date">${day.date}</h3>
                    <h4 id="temp_c">${day.day.avgtemp_c} °C</h4>
                    <p id="text">${day.day.condition.text}</p>
                    <img id="icon" src="https:${day.day.condition.icon}" alt="Weather icon" class="img-fluid">
                    <div class="d-flex justify-content-between mt-3">
                        <div id="max_temp" class="w-100 "><p>Max Temp: ${day.day.maxtemp_c} °C</p></div>
                        <div id="min_temp" class="w-100 addBorder"><p>Min Temp: ${day.day.mintemp_c} °C</p></div>
                        <div id="humidity" class="w-100"><p>Humidity: ${day.day.avghumidity}%</p></div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById('forecastRowData').innerHTML = cartona2;
}

// Ensure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetchWeatherButton').addEventListener('click', fetchWeather);
});
