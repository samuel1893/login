const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/User");
const db = require("./models/db");
const crypto = require("crypto")

const port = 3310;
var path = require("path");
const { useCLS } = require("sequelize");
const app = express();

app.use(session({secret:"hfewiu2hgfoewhgf"}));
app.use(bodyParser.urlencoded({extended:true}));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname, "/views"));

app.get("/login",(req, res) => {
    res.render("login");
})

app.get("/registrar",(req, res) => {
    res.render("registrar");
})


app.post("/registrar", async(req, res) => {
    var nome= req.body.name;
    var email= req.body.email;
    var senha= req.body.password;
    var cargo = req.body.role;
    let hash = crypto.createHash('md5').update("senha").digest("hex")
    await User.create({nome: nome, email: email, password: hash, cargo: cargo});
 
    res.render("login");
})
app.post("/login", async(req, res) => {
    var email= req.body.email;
    var senha= req.body.password;
    let hash = crypto.createHash('md5').update("senha").digest("hex")
 
    res.render("login");
})

app.listen(port, () => {
    console.log("Servidor iniciado na porta 3310: http://localhost:3310");
})