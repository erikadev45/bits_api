const mysql = require('mysql');
const CONFIG = require('../config/config');

const settings = {
    host: CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    dateStrings: true
};

const dbConnect = mysql.createConnection(settings);

dbConnect.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConnect;