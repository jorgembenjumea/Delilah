const express = require("express");
const server = express();

const ENV = process.env.NODE_ENV || "development"
const config = require("./config/" + ENV).config

const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./db/sequelize");
// routes
const {addUserToDB,logUser,authenticateUser,isAdmin,getUserFromDB } = require("./routes/user");
const {addProduct,getProducts,updateProduct,deleteProduct,getProductsId}= require("./routes/product");
const {}= require("./routes/order");

server.use(bodyParser.json());
server.use(cors());
/* Users endpoint */
server.post("/api/v1/delilah/register", addUserToDB,(req, res) => {});
server.post("/api/v1/delilah/log", logUser,(req, res,next) => {});
server.get("/api/v1/delilah/users",authenticateUser,isAdmin,getUserFromDB,(req, res) => {});

/* products endpoints */
server.post("/api/v1/delilah/products",authenticateUser,isAdmin,addProduct,(req, res)=> {});
server.get("/api/v1/delilah/products",authenticateUser,getProducts,(req, res)=> {});
server.get("/api/v1/delilah/products/:id",authenticateUser,getProductsId,(req, res)=> {});
server.delete("/api/v1/delilah/products/:id",authenticateUser,isAdmin,deleteProduct,(req, res)=> {});
server.patch("/api/v1/delilah/products/:id",authenticateUser,isAdmin,updateProduct,(req, res)=> {});

/* Order endpoints */
server.post("/api/v1/delilah/order",(req, res)=> {});
server.patch("/api/v1/delilah/order/:id",(req, res)=> {});
server.delete("/api/v1/delilah/order/:id",(req, res)=> {});



console.log("Environment =========> ",ENV)
server.listen(config.Port, () => {
    console.log("Servidor escuchando en puerto: " + config.Port);
});

//2541