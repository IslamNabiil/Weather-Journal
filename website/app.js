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


//add click event on generate btn
document.getElementById('generate').addEventListener('click', ()=> {

    const weather = async () => {
        const zip = document.getElementById('zip').value;
        const feelings = document.getElementById('feelings').value;

        const entries = async (zip, feelings) => {
            const weatherAsync = await getData(mainURL, zip, apiKey);
            let temp = weatherAsync.main.temp;//get the current temp from the API

            let inputs = {
                'zip-code': zip,
                'feelings': feelings,
                'temp': temp,
                'date': newDate
            };

            await updateUI(inputs);
            document.getElementById('temp').innerHTML = `Temperature: ${temp} °C`;
            return inputs;
        }
        
        //Initiate validation
        await entries(zip, feelings);
    };

    //function of updating the information to the user
    const updateUI = async (inputs) => {
        const saveData = await postData('/all', inputs);
        const feeling = saveData['feelings'];
        
        //insert the new data in the page
        document.getElementById('date').innerHTML = `Date: ${newDate}`;
        document.getElementById('content').innerHTML =`Feelings: ${feeling}`;
        return saveData;
    };

    //Initiate acynchromnus functions weather() and updataUI() on click
    weather();
});