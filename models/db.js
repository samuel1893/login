const Sequelize = require("sequelize");

const sequelize = new Sequelize("basededados", "root", "example", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = sequelize;