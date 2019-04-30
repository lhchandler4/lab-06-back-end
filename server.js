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

