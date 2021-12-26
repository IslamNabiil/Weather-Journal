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

//post data to the local url
const postData = async (url = '', info = {}) => {
    const res = await fetch(url, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(info),
    });
    try {
        const newDate = await res.json()
        return newDate;
    } catch (err) {
        console.log(err)
    }
}

//function of updating the information to the user
const updateUI = async (inputs) => {
    const saveData = await postData('/all', inputs);
    const feeling = saveData['feelings'];
    
    //insert the new data in the page
    document.getElementById('date').innerHTML = `Date: ${newDate}`;
    document.getElementById('content').innerHTML =`Feelings: ${feeling}`;
    return saveData;
};