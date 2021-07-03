module.exports = function(sequelize, Sequelize) {
    const Conseil = sequelize.define("conseil", {
        idConseil: {
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
        conseil: {
            type: Sequelize.STRING,
        },
    }, {
        freezeTableName: true,
        tableName: 'conseil',
        createdAt: false,
        updatedAt: false
    });
    return Conseil;
}