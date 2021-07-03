const RdvController = require('../controllers/rendezVous.controller');
var router = require("express").Router();

router.post("/", RdvController.addRdv)
    //get all RDV of a given doctor
router.get("/:id", RdvController.getAllRdv)

//get all RDV En cours of a given doctor
router.get("/:id/encours", RdvController.getAllRdvEnCours)


module.exports = router;