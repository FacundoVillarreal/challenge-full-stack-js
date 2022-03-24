const { Sequelize } = require('sequelize');

const NODE_ENV = process.env.NODE_ENV || "development";

require('dotenv').config({
    path: `.env.${NODE_ENV}`
}); 

//cadena de conexion
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER_NAME,
    process.env.DATABASE_PASS,
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 6,
            min: 0,
            require: 30000,
            idle: 10000
        },
        loggin: false
    }
)

module.exports = sequelize;