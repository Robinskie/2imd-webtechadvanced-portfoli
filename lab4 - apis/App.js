const weatherOutput = document.querySelector("#weatherOutput");
const weatherComment = document.querySelector("#weatherComment");
const cardImage = document.querySelector("#cardImage");
const adBackground = document.querySelector(".adv-background");

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
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
            .then(response => response.json())
            .then(data => {
                this.data = data;

                let weatherOutputText = "";
                let weatherCommentText = "";
                let cardLand = "";
                // Temperatures
                if(this.getTemperature() < 10) {
                    weatherOutputText = "a little chilly";
                    weatherCommentText = "enjoying the cold";
                    cardLand = "plains";
                } else if(this.getTemperature() < 20) {
                    weatherOutputText = "like nice spring weather";
                    weatherCommentText = "enjoying a picnic";
                    cardLand = "forest";
                } else {
                    weatherOutputText = "a little hot";
                    weatherCommentText = "enjoying the scorching heat";
                    cardLand = "mountain";
                }

                // Overcast
                if(this.getState() == "Clouds") {
                    weatherOutputText = "a little overcast";
                    weatherCommentText = "cloudgazing";
                    cardLand = "swamp";
                }

                // Raining
                if(this.getState() == "Thunderstorm" || (this.getState() == "Drizzle") || (this.getState() == "Rain")) {
                    weatherOutputText = "a little rainy";
                    weatherCommentText = "watching the raindrops";
                    cardLand = "island";
                }

                weatherOutput.innerHTML = weatherOutputText;
                weatherComment.innerHTML = weatherCommentText;

                const card = new Card(cardLand);
            });
    }

    getTemperature() {
        return this.data.main.temp - 273.15;
    }

    getState() {
        return this.data.weather[0].main;
    }
}

class Card {
    constructor(input) {
        fetch(`https://api.scryfall.com/cards/search?q=${input}%20t:land&unique=art`)
            .then(response => response.json())
            .then(cardsList => {
                let pickedCard = cardsList.data[Math.floor(Math.random() * cardsList.data.length)];
                cardImage.src = pickedCard.image_uris.png;
                adBackground.style.backgroundImage = `url(${pickedCard.image_uris.png})`;
            });
    }
}

const app = new App();