const db = require("../models");
var jwt = require("jsonwebtoken");

const Medecin = db.medecin;
const Patient = db.patient;


const authMedecin = async(req, res, next) => {
    const { numero, motdepasse } = req.body;

    if (!numero || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide numero and password" })
    }
    // check for Medecin
    try {
        const medecin = await Medecin.findOne({ where: { numero: numero } })
        if (!medecin) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            console.log(motdepasse == medecin.motDePasse)
            if (motdepasse != medecin.motDePasse) {
                res.status(401).send({ success: false, error: "Invalid credentials" })

            } else {
                console.log("medecin connection established!")
                const token = jwt.sign({ id: medecin.idMedecin, role: "medecin" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(401).send({ success: false, error: "Invalid credentials" })
    }
}




const authPatinet = async(req, res, next) => {
    const { numero, motdepasse } = req.body;

    if (!numero || !motdepasse) {
        res.status(400).send({ success: false, error: "Please provide numero and password" })
    }
    // check for patinet
    try {
        const patient = await Patient.findOne({ where: { numero: numero } })
        if (!patient) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            //console.log(motdepasse == patinet.motDePasse)
            if (motdepasse != patient.motDePasse) {
                res.status(401).send({ success: false, error: "Invalid credentials" })

            } else {
                console.log("patient connection established!")
                const token = jwt.sign({ id: patient.idPatient, role: "patient" }, process.env.JWT_SECRET);
                res.send({ success: true, token: token });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(401).send({ success: false, error: "Invalid credentials" })
    }
}




module.exports = {
    authMedecin,
    authPatinet
}