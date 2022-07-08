const express = require("express");
const app = express();

app.use(session({secret:"hfewiu2hgfoewhgf"}));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname, "/views"));

app.get("/",(req, res) => {
    res.render("registrar");
})
app.post("/", async(req, res) => {
    res.render("registrar");
})