const db = require("../models");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const Medecin = db.medecin;
const HeureTravail = db.heureTravail;


const getAllMedecins = (req, res) => {
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
            if (role != "medecin" && role != "patient") {
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
    }

    Medecin.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Une erreur lors de la récupration des medecins.',
            });
        });
};

const getMedecin = async(req, res) => {
    const id = req.params.id;

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
            if (role != "medecin" && role != "patient") {
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
    }

    try {
        const medecin = await Medecin.findByPk(id)
        if (medecin) {
            res.status(200).send(medecin)
        } else {
            res.status(404).send({
                error: "not_found",
                message: 'there is no doctor with id= ' + id
            })
        }
    } catch {
        res.status(500).send({
            message: "Erreur lors de la récupération d'un medecin avec l'id=" + id
        });
    }
};

const heureTravail = async(req, res) => {
    const id = req.params.id;

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
            if (role != "medecin" && role != "patient") {
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
    }

    var options = {};
    let jour = req.body.jour;

    if (jour) {
        options.jour = {
            [Op.eq]: jour
        }
    }
    try {
        const heure = await HeureTravail.findAll({
            where: {
                [Op.and]: [
                    { idMedecin: id },
                    options
                ]
            }
        })
        if (heure) {
            res.status(200).send(heure)
        } else {
            res.status(404).send({
                error: "not_found",
                message: 'le medecin avec id= ' + id + " n'est pas desponible dans cette date"
            })
        }
    } catch (e) {
        res.status(500).send({
            message: "Erreur lors de la récupération les heures de travail de medecin avec l'id=" + e
        });
    }
};

module.exports = {
    getAllMedecins,
    getMedecin,
    heureTravail
}