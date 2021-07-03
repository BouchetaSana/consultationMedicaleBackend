const db = require("../models");
const { Op } = require("sequelize");
var dateFormat = require('dateformat');

const RendezVous = db.rendezVous;
const HeureTravail = db.heureTravail;

const addRdv = async(req, res) => {

    // Validate request
    if ((!req.body.idMedecin) || (!req.body.idPatient) || (!req.body.heureRdv) || (!req.body.heureFinEstimee)) {
        res.status(400).send({
            error: "validation_error",
            message: "Content can not be empty!"
        });
        return;
    }

    if (req.body.dateRdv < Date.now()) {
        res.status(400).send({
            error: "validation_error",
            message: "Error in date!"
        });
        return;
    }


    if (req.body.heureRdv > req.body.heureFinEstimee) {
        res.status(400).send({
            error: "validation_error",
            message: "Error in hours!"
        });
        return;
    }

    //create RDV 
    const rdv = {
        idMedecin: req.body.idMedecin,
        idPatient: req.body.idPatient,
        dateRdv: req.body.dateRdv ? req.body.dateRdv : Date.now(),
        heureRdv: req.body.heureRdv,
        heureFinEstimee: req.body.heureFinEstimee,
    }
    try {
        let jourTravail = await HeureTravail.findAll({
            where: {
                [Op.and]: {
                    idMedecin: rdv.idMedecin,
                    jour: rdv.dateRdv,
                    heureDebut: {
                        [Op.lte]: rdv.heureRdv
                    },
                    heureFin: {
                        [Op.gt]: rdv.heureRdv
                    }
                }
            }
        })
        if (jourTravail.length > 0) {
            let jourRdv = await RendezVous.findAll({
                where: {
                    [Op.and]: {
                        idMedecin: rdv.idMedecin,
                        dateRdv: rdv.dateRdv,
                        heureRdv: {
                            [Op.lte]: rdv.heureRdv
                        },
                        heureFinEstimee: {
                            [Op.gt]: rdv.heureRdv
                        }
                    }
                }
            })
            if (jourRdv.length > 0) {
                console.log(jourRdv[0].heureFinEstimee)
                res.status(400).send({
                    message: "Le médecin ne sera pas disponible pour cette heure veuillez changer l'heure."
                });
                return;
            } else {
                data = RendezVous.create(rdv).then((data) => {
                    res.status(201).send(data);
                });
                return;
            }

        } else {
            res.status(400).send({
                message: "Le médecin ne travaille pas à cette date."
            });
            return;
        }

    } catch (e) {
        res.status(500).send({
            message: "Erreur lors de la creation d'un rendezVous" + e
        });
    }
};
module.exports = {
    addRdv
}