module.exports = function(sequelize, Sequelize) {
    const Traitement = sequelize.define("traitement", {
        idTraitement: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: Sequelize.STRING(30)
        },
        idMedecin: {
            type: Sequelize.INTEGER
        },
        idPatient: {
            type: Sequelize.INTEGER
        },
        etat: {
            type: Sequelize.DataTypes.ENUM({
                values: ['En cours', 'Finie']
            })
        },
        prise: {
            type: Sequelize.INTEGER,
        },
        duree: {
            type: Sequelize.INTEGER,
        },
    }, {
        freezeTableName: true,
        tableName: 'traitement',
        createdAt: false,
        updatedAt: false
    });
    return Traitement;
}