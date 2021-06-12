const MedecinController = require('../controllers/medecin.controller');
var router = require("express").Router();

router.get('/', MedecinController.getAllMedecins)


module.exports = router;