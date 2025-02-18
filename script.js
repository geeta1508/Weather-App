const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    if (city.trim() === "") {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("city").textContent = data.name;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("windSpeed").textContent = `${data.wind.speed} km/h`;

        // Change weather icon based on API condition
        const weatherIcon = document.getElementById("weather-icon");
        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition.includes("sunny")) {
            weatherIcon.src = "sun.jpg";
        } else if (weatherCondition.includes("rain")) {
            weatherIcon.src = "rainimg.jpg";
        } else if (weatherCondition.includes("clear")) {
            weatherIcon.src = "sun.jpg";
        } else {
            weatherIcon.src = "rain2.jpg";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

// Add event listener
document.getElementById("searchBtn").addEventListener("click", fetchWeather);
