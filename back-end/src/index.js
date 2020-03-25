const express = require('express');

const cors = require('cors');

//colocar "./" pois se não o node vai achar que é um pacote e não um arquivo. 
const routes = require('./routes'); 

const app = express(); 

app.use(cors())

// comprender o json
app.use(express.json()); 

// aqui ele vai usar o modulo routes
app.use(routes);

//escutando a porta 3333
app.listen(3333);


