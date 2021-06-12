const authController = require('../controllers/auth.controller');
var router = require("express").Router();

router.post("/medecin/", authController.authMedecin);
router.post("/patient/", authController.authPatinet);




module.exports = router;