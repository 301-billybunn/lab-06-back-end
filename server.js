'use strict';
// load dotenv to manage variables
require('dotenv').config();

// Load express to do the heavy lifting for the server
const express = require('express');
const app = express();
const cors = require('cors');

// Establish the PORT number
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

// Tell express where to load our "html" files from
app.use(express.static('./public'));


// Create routes (paths) that the user can access the server from
// ----API routes-------

// google location route
app.get('/location', (request, response) => {
    const locationData = searchtoLatLong(request.query.data);
    response.send(locationData);
});

// Dark Sky route

// Yelp food review route

// MovieDB route

// Hiking route

// Path the redirects to index.html
// app.get('/', (request, response) => {
//   response.status(200).redirect('index.html');
// });

// Add a catch-all to get routes that don't exist.
// app.use('*', (request, response) => response.send(`Sorry, that route does not exist`));
app.use('*', (request, response) => {
    response.send(handleError());
});

// Turn the server on
app.listen(PORT, () => console.log(`Listening on ${PORT}`));


//---Helper Function---//

//Error handler
function handleError(err, res) {
    console.error(err);
    if (res) res.status(500).send('Sorry, something went worng');
}

// 
function searchtoLatLong(query) {
    const geoData = require('./data/geo.json');
    const location = new Location(query, geoData);
    console.log('location in searchToLatLong()', location);
    return location;
}

// Constructs location object from API response
function Location(query, res) {
    console.log('res in Location()', res);
    this.search_query = query;
    this.formatted_query = res.results[0].formatted_address;
    this.latitude = res.results[0].geometry.location.lat;
    this.longitude = res.results[0].geometry.location.lng;
}

