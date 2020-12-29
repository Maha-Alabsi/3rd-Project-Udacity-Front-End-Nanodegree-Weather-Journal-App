'use strict';
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Import express bodyParser Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Import CORS package
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder
app.use(express.static('website'));

//Setup Server 
//Server URL: http://localhost:8000/
const port = 8000;
const server = app.listen(port, listening);
//Declare a Callback function
function listening() {
    console.log("server running"); 
    console.log(`running on location: ${port}`);
}

/* Empty JS object to act as endpoint for all routes */
let projectData = {};

//Get Route
//Get all data by the : http://localhost:8000/all
app.get('/all', function (req, res) {
    res.send(projectData);
});

// Post Route
app.post('/addWeather', addWeather); 
function addWeather(req, res) {
    //Create a new entry our data endpoint using the request.body that comes back to us.
    let newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feel: req.body.feel
    }
    projectData = newEntry
    console.log(projectData)
}
