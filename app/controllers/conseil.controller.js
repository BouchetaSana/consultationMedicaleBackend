const db = require("../models");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');


const Conseil = db.conseil;

const addConseil = async(req, res) => {
    console.log(req.body)
    if ((!req.body.idMedecin) || (!req.body.idPatient) || (!req.body.conseil)) {
        res.status(400).send({
            error: "validation_error",
            message: "Content can not be empty!"
        });
        return;
    }

    var msg = {
        idMedecin: req.body.idMedecin,
        idPatient: req.body.idPatient,
        conseil: req.body.conseil,
    }

    Conseil.create(
        msg
    ).then(
        function(data) {
            res.status(201).send({
                message: "Conseil added",
            });
        }).catch(function(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while adding conseil."
        })
    })
}


const getConseilMedecin = (req, res) => {
    const id = req.params.id;
    /*
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            res.status(403).send({
                error: "invalid_access_token",
                message: "Access Forbidden,invalid token",
            });
            return;
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if (user != undefined) {
                const role = user.role
                if (role != "medecin") {
                    res.status(403).send({
                        error: "authorization_required",
                        message: "Access Forbidden,you can't do this operation",
                    });
                    return;
                }
            }

        } catch (err) {
            res.status(403).send({
                error: "invalid_access_token",
                message: "Access Forbidden,invalid token",
            });
            return;
        }*/
    RendezVous.findAll({
            where: {
                idMedecin: id,
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving conseil."
            });
        });
};



const getConseilPatient = (req, res) => {
    const id = req.params.id;

    RendezVous.findAll({
            where: {
                idPatient: id,
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving conseil."
            });
        });
};

module.exports = {
    addConseil,
    getConseilMedecin,
    getConseilPatient
}