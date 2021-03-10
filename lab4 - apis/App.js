const weatherOutput = document.querySelector("#weatherOutput");
const weatherComment = document.querySelector("#weatherComment");

class App {
    constructor() {
        this.init();
    }

    init() {
        const location = new Location();
    }
}

class Location {
    constructor() {       
        this.setPosition();
    }

    async setPosition() {
        navigator.geolocation.getCurrentPosition((result) => {
            this.latitude = result.coords.latitude;
            this.longitude = result.coords.longitude;

            this.setWeather();
        });
    }

    setWeather() {
        this.weather = new Weather(this.latitude, this.longitude);
    }
}

class Weather {
    constructor(latitude, longitude) {
        const key = "3e49109d71084c3334850b2ebad410f5";
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
            .then(response => response.json())
            .then(data => {
                this.data = data;

                console.log(this.getTemperature());

                let weatherOutputText = "";
                let weatherCommentText = "";
                // Temperatures
                if(this.getTemperature() < 10) {
                    weatherOutputText = "a little chilly";
                    weatherCommentText = "enjoying the cold";
                } else if(this.getTemperature() < 20) {
                    weatherOutputText = "like nice spring weather";
                    weatherCommentText = "enjoying a picnic";
                } else {
                    weatherOutputText = "a little hot";
                    weatherCommentText = "enjoying the scorching heat";
                }

                // Overcast
                if(this.getState() == "Clouds") {
                    weatherOutputText = "a little overcast";
                    weatherCommentText = "cloudgazing";
                }

                // Raining
                if(this.getState() == "Thunderstorm" || (this.getState() == "Drizzle") || (this.getState() == "Rain")) {
                    weatherOutputText = "rainy";
                    weatherCommentText = "watching the raindrops";
                }

                weatherOutput.innerHTML = weatherOutputText;
                weatherComment.innerHTML = weatherCommentText;
            });
    }

    getTemperature() {
        return this.data.main.temp - 273.15;
    }

    getState() {
        return this.data.weather[0].main;
    }
}

const app = new App();