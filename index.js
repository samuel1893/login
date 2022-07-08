const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/User");
const db = require("./models/db");
const crypto = require("crypto");
let alert = require('alert'); 


const port = 3310;
var path = require("path");
const { useCLS, where } = require("sequelize");
const sequelize = require("sequelize");
const { userInfo } = require("os");
const app = express();

const header = JSON.stringify({
    'alg': 'HS256',
    'typ': 'JWT'
});

app.use(session({secret:"ewt457dfhdf"}));
app.use(bodyParser.urlencoded({extended:true}));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname, "/views"));



app.get("/registrar",(req, res) => {
    res.render("registrar");
})
app.get("/login",(req, res) => {
    res.render("login");
})
app.get("/inicio",(req, res) => {
    res.render("inicio");
})

app.post("/registrar", async(req, res) => {
    var nome= req.body.name;
    var email= req.body.email; 
    var senha= req.body.password;
    var cargo = req.body.role;
    let hash = crypto.createHash('md5').update(senha).digest("hex");
   
    await User.create({nome: req.body.name, password: hash, email: email, cargo: cargo});
    console.log(nome, email, hash, cargo);
 
    res.render("inicio");
})
app.post("/login", async(req, res) => {
    var email= req.body.email;
    var senha= req.body.password;
    let hash = crypto.createHash('md5').update(senha).digest("hex");

    const payload = JSON.stringify({
        'email': email,
        'password': hash
    });
    const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
    const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
    const secret = 'my-custom-secret';

    const data = base64Header + '.' + base64Payload;

    const signature = crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('base64');

    const signatureUrl = signature
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')


    let user = await User.findOne({
        where: {
            email: email,
            password: hash
        }
    })
    if (user!= null){
        res.render("inicio");
        alert('Welcome');
    }
    else{
        alert('Incorrect email or password.')
        res.render("login");
    }
    return(signatureUrl);       
})

app.get("/help",(req, res) => {
    res.render("help");
})

app.post("/help",(req, res) => {
    if(signatureUrl !== null && signatureUrl !== '') {
        console.log(signatureUrl);
        res.render("help");
    }
    else{
        res.render("registrar")
        alert('Unauthorized')
    }
})

app.listen(port, () => {
    console.log("Servidor iniciado na porta 3310: http://localhost:3310");
})