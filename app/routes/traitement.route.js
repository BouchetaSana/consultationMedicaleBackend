const TraitementController = require('../controllers/traitement.controller');
var router = require("express").Router();

router.post('/', TraitementController.addTraitement)


router.get('/:id', TraitementController.getAllTraitemntEnCours)

module.exports = router