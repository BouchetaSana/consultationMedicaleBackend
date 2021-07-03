const RdvController = require('../controllers/rendezVous.controller');
var router = require("express").Router();

//router.get('/', RdvController.getAllRendezVous)
router.post("/", RdvController.addRdv)

module.exports = router;