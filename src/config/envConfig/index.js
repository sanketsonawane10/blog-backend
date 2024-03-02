const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    // Development DB
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    // Node Env
    nodeEnv: process.env.NODE_ENV,
    // Node Env
    nodePort: process.env.PORT,

};
