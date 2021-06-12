const db = require("../models");
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
                res.send({ success: true, role: "medecin" });
                console.log("medecin connection established!")
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
        const patinet = await Patient.findOne({ where: { numero: numero } })
        if (!patinet) {
            res.status(401).send({ success: false, error: "Invalid credentials" })
        } else {
            //console.log(motdepasse == patinet.motDePasse)
            if (motdepasse != patinet.motDePasse) {
                res.status(401).send({ success: false, error: "Invalid credentials" })

            } else {
                res.send({ success: true, role: "patinet" });
                console.log("patient connection established!")
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