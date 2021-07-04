const db = require("../models");
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');


const RendezVous = db.rendezVous;
const HeureTravail = db.heureTravail;

const addRdv = async(req, res) => {
    console.log(req.body);
    /*  const authHeader = req.headers['authorization']
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
      }*/
    // Validate request
    if ((!req.body.idMedecin) || (!req.body.idPatient) || (!req.body.heureRdv) || (!req.body.heureFinEstimee)) {
        res.status(400).send({
            error: "validation_error",
            message: "Content can not be empty!"
        });
        return;
    }

    let today = new Date().toISOString().slice(0, 10)
    if (req.body.dateRdv < today) {
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

const getRdv = (req, res) => {
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
    RendezVous.findOne({
            idRdv: id,
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving RDV."
            });
        });
};


const getAllRdv = (req, res) => {
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
            idMedecin: id,
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving RDV."
            });
        });
};

const getAllRdvEnCours = (req, res) => {
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
                [Op.and]: {
                    idMedecin: id,
                    EnCours: true,
                }
            }
        })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                console.log('azaa')
                res.send({ message: "le medecin avec id " + id + " n'a pas de rendez vous en cours" })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving RDV."
            });
        });
};
module.exports = {
    addRdv,
    getRdv,
    getAllRdv,
    getAllRdvEnCours
}