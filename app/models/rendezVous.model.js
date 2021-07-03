module.exports = function(sequelize, Sequelize) {
    const RendezVous = sequelize.define("rendezVous", {
        idRdv: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idMedecin: {
            type: Sequelize.INTEGER
        },
        idPatient: {
            type: Sequelize.INTEGER
        },
        dateRdv: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
        heureRdv: {
            type: Sequelize.TIME,
            defaultValue: Sequelize.NOW,
        },
        heureFinEstimee: {
            type: Sequelize.TIME,
        },
        EnCours: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    }, {
        freezeTableName: true,
        tableName: 'rendezVous',
        createdAt: false,
        updatedAt: false
    });
    return RendezVous;
}