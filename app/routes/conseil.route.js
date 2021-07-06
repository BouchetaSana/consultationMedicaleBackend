const ConseilController = require('../controllers/conseil.controller');
var router = require("express").Router();

router.post('/', ConseilController.addConseil)

router.get('/medecin/:id', ConseilController.getConseilMedecin)

router.get('/patient/:id', ConseilController.getConseilPatient)

module.exports = router