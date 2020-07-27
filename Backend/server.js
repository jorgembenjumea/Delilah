const express = require("express");
const server = express();
const ENV = process.env.NODE_ENV || "development"
const config = require("./config/" + ENV).config
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./db/sequelize");
// routes
const {addUserToDB,logUser,authenticateUser,isAdmin,getUserFromDB } = require("./routes/user");
const {addProduct}= require("./routes/product");



const privateKey = "secure key";
server.use(bodyParser.json());
server.use(cors());



// Registrar/agregar usuarios ok
server.post("/api/v1/delilah/register", addUserToDB,(req, res) => {});
//logeo de usuario
server.post("/api/v1/delilah/log", logUser,(req, res,next) => {});
server.get("/api/v1/delilah/users", getUserFromDB,(req, res) => {});
server.post("/api/v1/delilah/addProduct",authenticateUser,addProduct,(req, res)=> {});





server.listen(config.Port, () => {
    console.log("Servidor escuchando en puerto: " + config.Port);
});