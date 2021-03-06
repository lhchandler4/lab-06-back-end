'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
var weatherArr = [];


app.get('/location', (request, response) => {
  try {
    const locationData = require('./data/geo.json');
    let searchQuery = request.query.data;
    let formattedAddress = locationData.results[0].formatted_address;
    let latitude = locationData.results[0].geometry.location.lat;
    let longitude = locationData.results[0].geometry.location.lng;

    let locationInstance = new Place(searchQuery, formattedAddress, latitude, longitude);
    // response.status(200).send(locationInstance);
    response.send(locationInstance);
  } catch( error ) {
    console.log('Sorry, There was an Error');
    response.status(500).send('Sorry, There was an Error');
  }
});


app.get('/weather', (request, response) => {
  try {
    const weatherData = require('./data/darksky.json');
    for(let i=0; i<8; i++){
      let forecast =  weatherData.daily.data[i].summary;
      let time = weatherData.daily.data[i].time;
      new Weather(forecast, time);
    }
    response.status(200).send(weatherArr);

  } catch( error ) {
    console.log('Sorry, There was an Error');
    response.status(500).send('Sorry, There was an Error');
  }
});


app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));

function Place (searchQuery, formattedAddress, lat, lng) {
  this.search_query = searchQuery;
  this.formatted_query = formattedAddress;
  this.latitude = lat;
  this.longitude = lng;
}

function Weather (forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time*1000).toDateString();
  weatherArr.push(this);
}
