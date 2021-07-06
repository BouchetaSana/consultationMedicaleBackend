const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.medecin = require("./medecin.model.js")(sequelize, Sequelize);
db.patient = require("./patient.model.js")(sequelize, Sequelize);
db.rendezVous = require("./rendezVous.model.js")(sequelize, Sequelize);
db.conseil = require("./conseil.model.js")(sequelize, Sequelize);
db.heureTravail = require("./heureTravail.model.js")(sequelize, Sequelize);
db.traitement = require("./traitement.model.js")(sequelize, Sequelize);




//To test the database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;