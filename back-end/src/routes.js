const express = require('express');


const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController'); 
const ProfileController = require('./controllers/ProfileController'); 
const SessionController = require('./controllers/SessionController'); 


const routes = express.Router();


routes.post('/sessions', SessionController.create);


// retornar os dados cadastrados
routes.get('/ongs', OngController.index);
// cadastrar ongs
routes.post('/ongs', OngController.create);


//perfil da ong
routes.get('/profile', ProfileController.index);


// retornar os dados cadastrados
routes.get('/incidents', IncidentController.index);
// cadastrar casos
routes.post('/incidents', IncidentController.create);


//deletar casos que a ong quer 
routes.delete('/incidents/:id', IncidentController.delete);




module.exports = routes; //exportando modulo