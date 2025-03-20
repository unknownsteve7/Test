const apiKey = "05f00bfa923cbb402577e6b98dc4d536";
let isCelsius = true;

function handleKeyPress(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}

function toggleUnits() {
    isCelsius = !isCelsius;
    getWeather();
}

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const unit = isCelsius ? "metric" : "imperial";
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        document.getElementById("weather-info").innerHTML = `
            <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°${isCelsius ? "C" : "F"}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
        `;

        fetchWeatherData('today');
        $(".hide").show();
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `
            <p id="error-message">Sorry, this city is not in our database.</p>
            <p>We are still adding more locations. Try searching for a different city.</p>
        `;
        $(".hide").hide();
    }
}

function fetchWeatherData(period) {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    let labels = [], temperatures = [];
    let now = new Date();
    for (let i = 0; i < (period === 'year' ? 12 : period === 'month' ? 30 : period === 'week' ? 7 : 24); i++) {
        labels.push(period === 'today' ? `${(i % 12) + 1} ${(i < 12) ? 'AM' : 'PM'}` : new Date(now - i * 24 * 60 * 60 * 1000).toDateString());
        temperatures.push(Math.random() * (35 - 15) + 15);
    }
    labels.reverse(); temperatures.reverse();
    updateChart(labels, temperatures);
}

function updateChart(labels, data) {
    let ctx = document.getElementById('weatherChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: data,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

$(document).ready(function() {
    $(".hide").hide();
});
