const { Sequelize } = require('sequelize');
const sequelize = require('../db/database');

//defino el modelo de datos de mi base de datos:
//Nombre de modelo: 'operations' 
const Operations = sequelize.define('operations', {
    //propiedades de operations
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    concepto: {
        type: Sequelize.TEXT
    },
    monto: {
        type: Sequelize.INTEGER
    },
    fecha: {
        type: Sequelize.DATE
    },
    tipo: {
        type: Sequelize.TEXT
    },
    user_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});
Operations.sync({ alter: true })
    .then(console.log("create table operations succes"))
    .catch(console.log)
module.exports = Operations;