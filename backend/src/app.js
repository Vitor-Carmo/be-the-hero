const express = require('express');

const cors = require('cors');

const { errors } = require('celebrate');

//colocar "./" pois se não o node vai achar que é um pacote e não um arquivo. 
const routes = require('./routes'); 

const app = express(); 

app.use(cors())

// comprender o json
app.use(express.json()); 

// aqui ele vai usar o modulo routes
app.use(routes);

app.use(errors());

module.exports = app;



