const connection = require('../database/connection'); // connection com o banco 
const crypto = require('crypto'); // usar para criar um id radom


module.exports = {

    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');  // criando um id randon

        // await: aguardar terminar a connection
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });   

        return response.json({ id }); //retornando o id para a ong 
        
    }

};