const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //modulo para fazer a validação



const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController'); 
const ProfileController = require('./controllers/ProfileController'); 
const SessionController = require('./controllers/SessionController'); 


const routes = express.Router();


routes.post('/sessions', SessionController.create);  //fazer rota **


// retornar os dados cadastrados
routes.get('/ongs', OngController.index); //fazer rota **


/* cadastrar ongs
 * coloquei o celebrate antes de criar a ong para que aconteça
 * a validação dos dados
 */
routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(), //tipo string, e obrigatório
        email: Joi.string().required().email(), //formato email
        whatsapp: Joi.string().required().min(10).max(10), //tipo numero, minimo 10, max 11
        city: Joi.string().required(),
        uf: Joi.string().required().length(2) // tamanho de 2


    })
}) ,OngController.create);


//perfil da ong
routes.get('/profile', celebrate({
    [ Segments.HEADERS] : Joi.object({ //header da aplicação
        authorization: Joi.string().required(), 
    }).unknown()
}) ,ProfileController.index);



// retornar os dados cadastrados
routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number(), 
    })
}),IncidentController.index);



// cadastrar casos
routes.post('/incidents', celebrate({
    [ Segments.HEADERS] : Joi.object({ //header da aplicação
        authorization: Joi.string().required(), 
    }).unknown()
}),celebrate({
    [Segments.BODY] : Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })

}),IncidentController.create);


//deletar casos que a ong quer 
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required() //o id para deletar tem que ser um número (obrigatório)
    })
}) , IncidentController.delete);




module.exports = routes; //exportando modulo