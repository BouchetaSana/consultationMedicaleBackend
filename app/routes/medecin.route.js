const MedecinController = require('../controllers/medecin.controller');
var router = require("express").Router();

router.get('/', MedecinController.getAllMedecins)
router.get('/:id', MedecinController.getMedecin)


module.exports = router;