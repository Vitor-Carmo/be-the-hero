// metodo up:  o que eu quero que seja feito.
exports.up = function(knex) {

    //Crio a tabela
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
  
};

//método down: o que eu faço se der algum problema.
exports.down = function(knex) {
    //eu deleto a tabela
    return knex.schema.dropTable('ongs');

};
