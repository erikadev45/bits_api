'use strict';
const CONFIG = require('./config/config');
var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
	connectionLimit: 10,
	host: CONFIG.db_host,
	user: CONFIG.db_user,
	password: CONFIG.db_password,
	database: CONFIG.db_name,
	charset: CONFIG.db_charset,
	collation: CONFIG.db_collation
});

migration.init(connection, __dirname + '/migrations', function () {
	console.log("finished running migrations");
});