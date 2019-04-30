'use strict';

require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/lab6', (request, response)=>{
  response.status(200).send('Hey it works');
});

app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));

app.get('/location', (request, response) => {
  try {
    let locationData = require('./data/geo.json');
    response.send(locationData);
  } catch( error ) {
    console.log('Sorry, There was an Error');
    response.status(500).send('Sorry, There was an Error');
  }
});

function Place (longName, shortName, types, lat, lng) {
  this.longName = longName;
  this.shortName = shortName;
  this.types = types;
  this.lat = lat;
  this.lng = lng;
}
