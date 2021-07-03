const MedecinController = require('../controllers/medecin.controller');
var router = require("express").Router();

router.get('/', MedecinController.getAllMedecins)
router.get('/:id', MedecinController.getMedecin)
router.get('/:id/calendar', MedecinController.heureTravail)



module.exports = router;