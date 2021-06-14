module.exports = function(sequelize, Sequelize) {
    const Patient = sequelize.define("patient", {
        idPatient: {
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
        photo: {
            type: Sequelize.STRING(30)
        },
        numero: {
            type: Sequelize.STRING(30),
            unique: true
        },
        motDePasse: {
            type: Sequelize.STRING(30)
        },

        birthDate: {
            type: Sequelize.DATEONLY
        },
        email: {
            type: Sequelize.STRING(30)
        },
        gender: {
            type: Sequelize.DataTypes.ENUM({
                values: ['HOMME', 'FEMME']
            })
        },
        poids: {
            type: Sequelize.DOUBLE
        },
        taille: {
            type: Sequelize.DOUBLE
        },
        groupeSanguin: {
            type: Sequelize.STRING(10)
        },
        maladie: {
            type: Sequelize.STRING(30)
        }
    }, {
        freezeTableName: true,
        tableName: 'patient',
        createdAt: false,
        updatedAt: false
    });
    return Patient;
}