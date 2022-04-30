require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '4000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'db_bits';
CONFIG.db_user = process.env.DB_USER || 'devmysql';
CONFIG.db_password = process.env.DB_PASSWORD || 'devp';
CONFIG.db_charset = 'utf8mb4';
CONFIG.db_collation = 'utf8mb4_unicode_ci';
CONFIG.BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

module.exports = CONFIG;