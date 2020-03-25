
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        
        table.increments(); //primery key increment
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); // FK

        table.foreign('ong_id').references('id').inTable('ongs') // fazendo o relacionamento

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
