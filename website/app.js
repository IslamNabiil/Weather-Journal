/* Global Variables */
const apiKey = ',&appid=7950b4cc301d11db966a7697d0a82e96&units=metric';
const mainURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const port = `http://localhost:3333`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1+'.'+ d.getDate()+'.'+ d.getFullYear();

//Get Current weather data from OpenWeatherMap.com API
const getData = async (mainURL, zip, apiKey) => {
    const response = await fetch(`${mainURL}${zip}${apiKey}`);

    try {
        const res = await response.json();
        return res;
    } catch (err) {
        console.log('error',err);
    }
};
