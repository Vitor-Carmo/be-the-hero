const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        // paginação dos casos 
        const { page = 1 } = request.query; 

        const [count] = await connection('incidents').count()

        console.log(count);

        const incidents = await connection('incidents')
         .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
         .limit(5)
         .offset((page - 1) * 5) // pular de 5 em 5, se for page = 1 => (1-1) * 5 = 0, (2-1) * 5 = 5,
         .select([
             'incidents.*', 
             'ongs.name', 
             'ongs.email', 
             'ongs.whatsapp',
             'ongs.city',
             'ongs.uf'
            ]);

        
        // Total de pages, via header
        response.header('X-Total-Count', count['count(*)']);
        

        return response.json(incidents);
    },


    async create(request, response) {
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization; //authorization, mesmo nome do header
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    },


    async delete(request, response) {
        
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // verificar se a ong que criou aquele caso, foi ela mesma que criou
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();          // como só tem um registro ele vai retornar o first.

        if(incident.ong_id != ong_id){
            //caso o id da ong for diferente do id do post vai dar um erro de não autorizado
            return response.status(401).json({error: 'Operation not permitted'});
        
        }

        //deletando o caso
        await connection('incidents').where('id', id).delete();

        // status code 204: uma resposta que deu sucesso, porém não tem nada para retornar
        return response.status(204).send();

    }


}