const db = require("../models");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');


const Traitement = db.traitement;

const addTraitement = async(req, res) => {
    console.log(req.body)
    if ((!req.body.idMedecin) || (!req.body.idPatient) || (!req.body.nom)) {
        res.status(400).send({
            error: "validation_error",
            message: "Content can not be empty!"
        });
        return;
    }

    var traitement = {
        idMedecin: req.body.idMedecin,
        idPatient: req.body.idPatient,
        nom: req.body.nom,
        duree: req.body.duree,
        prise: req.body.prise,
        etat: req.body.etat,
    }

    Traitement.create(
        traitement
    ).then(
        function(data) {
            res.status(201).send({
                message: "Traitement added",
            });
        }).catch(function(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding conseil."
        })
    })
}


const getAllTraitemntEnCours = (req, res) => {
    const id = req.params.id;

    Traitement.findAll({
            where: {
                [Op.and]: {
                    idPatient: id,
                    etat: "En cours",
                }
            }
        })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                console.log('azaa')
                res.send({ message: "le patient avec id " + id + " n'a pas de traitement en cours" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving RDV."
            });
        });
};


module.exports = {
    addTraitement,
    getAllTraitemntEnCours,
}