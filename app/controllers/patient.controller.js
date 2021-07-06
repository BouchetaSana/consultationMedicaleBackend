const db = require("../models");
const jwt = require('jsonwebtoken');

const Patient = db.patient;


const getPatient = async(req, res) => {
    const id = req.params.id;

    try {
        const patient = await Patient.findByPk(id)
        if (patient) {
            res.status(200).send(patient)
        } else {
            res.status(404).send({
                error: "not_found",
                message: 'there is no patient with id= ' + id
            })
        }
    } catch {
        res.status(500).send({
            message: "Erreur lors de la récupération d'un patient avec l'id=" + id
        });
    }
};

module.exports = {
    getPatient
}