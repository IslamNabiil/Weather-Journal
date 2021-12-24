/* Global Variables */
const apiKey = `,&apppid=7950b4cc301d11db966a7697d0a82e96&units=metric`
const mainURL = `http://api.openweathermap.org/data/2.5/weather?zip=`
const port = `http://localhost:3333`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//add click event to the generate btn
document.querySelector('#generate').addEventListener('click',()=>{
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    getData(zip).then((data)=>{
        
        if(data){
            const {main : {temp}} = data;
        }
        const info = {
            newDate,
            temp,
            feelings
        }
    })
}
)

//get data from api
const getData = async (zip)=>{
    try {
        const res = await fetch(mainURL + zip + apiKey)
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err)
    }
}


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
        console.log(err)
    }
}



const updataUI = async()=>{
    const res = await fetch(port +'/all')
    try {
        const savedData = await res.json();

        document.querySelector('#date').innerHTML = savedData.newDate
        document.querySelector('#temp').innerHTML = savedData.temp
        document.querySelector('#content').innerHTML = savedData.feelings
    } catch (err) {
        console.log(err)
    }
}
