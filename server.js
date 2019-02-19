'use strict';
// load dotenv to manage variables
require('dotenv').config();

// Load express to do the heavy lifting for the server
const express = require('express');
const app = express();

// Establish the PORT number
const PORT = process.env.PORT || 3000;

// Tell express where to load our "html" files from
app.use(express.static('./public'));

// Create routes (paths) that the user can access the server from
//create a route (path) that return 'location'
app.get('/location',(request, response) => {
    const locationData =searchtoLatLong(request.query.data);
    response.send(locationData);
});



// Path that returns a string
// app.get('/hello', (request, response) => {
//   response.status(200).send('Hello');
// });

// // Path that returns a JSON object
// app.get('/data', (request, response) => {
//   let airplanes = {
//     departure: Date.now(),
//     canFly: true,
//     pilot: 'David - needs autopilot'
//   }

//   response.status(200).json(airplanes);
// });

// // Path the redirects to index.html
// app.get('/', (request, response) => {
//   response.status(200).redirect('index.html');
// });

// Add a catch-all to get routes that don't exist.
app.use('*', (request, response) => response.send(`Sorry, that route does not exist`));

// Turn the server on
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//---Helper Function---//

//Error handler
function handleError(err,res) {
    console.error(err);
    if(res) res.status(500).send ('Sorry, something went worng');
}

function searchtoLatLong(query){
    const geoData= require('./data/geo.json');
    const location= new Location(query,geoData);
    console.log('location in searchToLatLong()',location);
    return location;
}

function Location(query, res) {
    console.log ('res in Location()', res);
    this.search_query =query;
    this.formatted_query = res.reults[0].formatted_address;
    this.latitude = res.results[0].geometry.location.lat;
    this.longitude = res.results[0].geometry.location.lng;
}

