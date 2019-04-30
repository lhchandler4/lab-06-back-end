'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// app.use(express.static('./public'));

app.get('/lab6', (request, response)=>{
  response.status(200).send('Hey it works');
});


app.get('/location', (request, response) => {
  // try {
  const locationData = require('./data/geo.json');
  let searchQuery = request.query.data;
  let formattedAddress = locationData.results[0].formatted_address;
  let latitude = locationData.results[0].geometry.location.lat;
  let longitude = locationData.results[0].geometry.location.lng;

  let locationInstance = new Place(searchQuery, formattedAddress, latitude, longitude);
  console.log(locationInstance);
  response.status(200).send(locationInstance);
 
 
 
  // } catch( error ) {
  //   console.log('Sorry, There was an Error');
  //   response.status(500).send('Sorry, There was an Error');
  // }
});

app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));

function Place (searchQuery, formattedAddress, lat, lng) {
  this.searchQuery = searchQuery;
  this.formattedAddress = formattedAddress;
  this.lat = lat;
  this.lng = lng;
}

