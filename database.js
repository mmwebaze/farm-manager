let knex = require('knex')({
	client: "sqlite3",
	connection: {
		filename: "./farm.db"
	}
});

module.exports.knex = knex;