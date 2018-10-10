const knex = require('./database');

function save(table, data) {
    let d = [];

    knex.knex(table).insert(data)
        .then(() => console.log("data inserted"))
        .catch((err) => {
            console.log(err);
            throw err
        })
        .finally(() => {
                console.log('Should close connection and not destroy');
                //knex.knex.destroy();
            }
        );
}

module.exports.save = save;