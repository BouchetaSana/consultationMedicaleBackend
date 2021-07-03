module.exports = function(sequelize, Sequelize) {
    const HeureTravail = sequelize.define("heureTravail", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idMedecin: {
            type: Sequelize.INTEGER
        },
        jour: {
            type: Sequelize.DATEONLY
        },
        heureDebut: {
            type: Sequelize.TIME,
        },

    }, {
        freezeTableName: true,
        tableName: 'heureTravail',
        createdAt: false,
        updatedAt: false
    });
    return HeureTravail;
}