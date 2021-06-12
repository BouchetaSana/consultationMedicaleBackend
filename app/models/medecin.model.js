module.exports = function(sequelize, Sequelize) {
    const Medecin = sequelize.define("medecin", {
        idMedecin: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: Sequelize.STRING(30)
        },
        prenom: {
            type: Sequelize.STRING(30)
        },
        numero: {
            type: Sequelize.DOUBLE,
            unique: true
        },
        motDePasse: {
            type: Sequelize.STRING(30)
        },
        specialite: {
            type: Sequelize.STRING(30)
        },
        latitude: {
            type: Sequelize.DOUBLE
        },
        longtitude: {
            type: Sequelize.DOUBLE
        },
        adresse: {
            type: Sequelize.STRING(30)
        },
        birthDate: {
            type: Sequelize.DATEONLY
        },
        email: {
            type: Sequelize.STRING(30)
        },
        gender: {
            type: Sequelize.STRING(30)
        }
    }, {
        freezeTableName: true,
        tableName: 'medecin',
        createdAt: false,
        updatedAt: false
    });
    return Medecin;
}