
// Require Express to run server and routes
const express = require('express')
const app = express()
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Setup Server
const port = 3333
app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`)
})

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

//get request on link http://localhost:3333/all
app.get('/all',(req,res)=>{
    res.status(200).send(projectData)
})

//post route http://localhost:3333/add
app.post('/add',(req,res)=>{
    projectData= req.body;
    res.status(200).send(projectData)
    console.log(projectData)
})