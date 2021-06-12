const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const db = require('./models');

const auth = require("./routes/auth.route")




var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


db.sequelize.sync()


app.use("/auth", auth)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to gestion de medicament application." });
});



module.exports = app;