const weather

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
                console.log(this.getState());
            });
    }

    getState() {
        return this.data.weather[0].main;
    }
}

const app = new App();