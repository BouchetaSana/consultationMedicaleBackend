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

const getMedecin = async (req, res) => {
     const id = req.params.id;

     try {
          const medecin = await Medecin.findByPk(id)
          if (medecin) {
               res.status(200).send(medecin)
          }
          else {
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

module.exports = {
     getAllMedecins,
     getMedecin
}