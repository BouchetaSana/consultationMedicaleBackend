const PatientController = require('../controllers/patient.controller');
var router = require("express").Router();

router.get('/:id', PatientController.getPatient)



module.exports = router;