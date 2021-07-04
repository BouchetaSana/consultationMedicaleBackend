const RdvController = require('../controllers/rendezVous.controller');
var router = require("express").Router();

router.post("/", RdvController.addRdv)

//get details of RDV
router.get("/:id", RdvController.getRdv)

//get all RDV of a given doctor
router.get("/medecin/:id", RdvController.getAllRdv)

//get all RDV En cours of a given doctor
router.get("/medecin/:id/encours", RdvController.getAllRdvEnCours)

//get all RDV of a given patient
router.get("/patient/:id", RdvController.getAllRdvPatient)

//get all RDV of a given patient
router.delete("/:id", RdvController.annulerRdv)

module.exports = router;