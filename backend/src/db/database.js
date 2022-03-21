const { Sequelize } = require('sequelize');

//cadena de conexion
const sequelize = new Sequelize(
    'administracion',//database name
    'postgres',//username
    'postgres',//pass
    //config para sequelize
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