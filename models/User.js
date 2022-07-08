const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const db = require("./db");

const User = db.define("user", {
    idpessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cargo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    auth_token: {
        type: sequelize.STRING,
        allowNull: true
    },
})

User.sync();

module.exports = User;