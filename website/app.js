/* Global Variables */
const apiKey = `,&apppid=7950b4cc301d11db966a7697d0a82e96&units=metric`
const mainURL = `http://api.openweathermap.org/data/2.5/weather?zip=`
const port = `http://localhost:3333`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//add click event to the generate btn
document.getElementById('generate').addEventListener('click',()=>{
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather = async (zip)=>{
        try {
            const res = await fetch(mainURL + zip + apiKey).then((data)=>{
                postData(port +'/add',{
                    currentdata: newDate,
                    temper: data.main.temp,
                    feeling: feelings
                })
            })
            const data = await res.json();
            return data
        } catch (err) {
            console.log("error", err); 
        }
    }
    updateUI();
})

//post data 
const postData = async (url = '', info = {} )=>{
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
        console.log("error", err);
    }
}

// to updataUI from the server and past it in the client side
const updateUI = async()=>{
    const res = await fetch('/all')
    try {
        const allData = await res.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch (err) {
        console.log("error", err);
    }
}