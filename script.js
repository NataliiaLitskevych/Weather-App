const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "0f99098ba14e55793ad9c3fac3073111"
};

const input = document.querySelector("#input");
const loader = document.querySelector("#loader");
const errorBox = document.querySelector("#error");         
const errorText = document.querySelector("#error-text"); 


input.addEventListener("keypress", enter);

input.addEventListener("input", () => {
  errorBox.style.display = "none";
});

function enter(e) {
    if (e.key === "Enter") {
        getInfo(input.value);
    }
}

async function getInfo(city) {
    loader.style.display = "block";           
    errorBox.style.display = "none";          
    try {
        const res = await fetch(`${api.endpoint}weather?q=${city}&units=metric&appid=${api.key}`);
        if (!res.ok) {
            throw new Error("City not found");
        }
        const result = await res.json();
        displayResult(result);
    } catch (error) {
        errorText.textContent = error.message;
        errorBox.style.display = "flex";
    } finally {
        loader.style.display = "none";        
    }
}

function displayResult(result) {
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = `Min: ${Math.round(result.main.temp_min)}<span>°</span> Max: ${Math.round(result.main.temp_max)}<span>°</span>`;

    applyWeatherTheme(result.weather[0].main.toLowerCase());
}

function getOurDate() {
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()];
    let todayDate = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();

    let showDate = document.querySelector("#date");
    showDate.textContent = `${day} ${todayDate} ${month} ${year}`;
}

function applyWeatherTheme(condition) {
    const body = document.body;

    if (condition.includes("cloud")) {
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } else if (condition.includes("rain")) {
        body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
    } else if (condition.includes("clear")) {
        body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
    } else if (condition.includes("snow")) {
        body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
    } else {
        body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
    }
}

getOurDate();
getInfo("Philadelphia");
setInterval(getOurDate, 60 * 60 * 1000); 

