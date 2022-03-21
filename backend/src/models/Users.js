const { Sequelize } = require('sequelize');
const sequelize = require('../db/database');



//defino el modelo de datos de mi base de datos:
//Nombre de modelo: 'users' 
const Users = sequelize.define('users', {
    //propiedades de operations
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    },

});

module.exports = Users;