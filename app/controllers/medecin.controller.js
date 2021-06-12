const db = require("../models");
const Medecin = db.medecin;

const getAllMedecins = (req, res) => {
     Medecin.findAll()
          .then((data) => {
               res.status(200).send(data);
          })
          .catch((err) => {
               res.status(500).send({
                    message:
                         err.message || 'Une erreur lors de la récupration des medecins.',
               });
          });
};

module.exports = {
     getAllMedecins
}