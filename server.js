const express = require("express");
const server = express();

const CORS = require("cors");
// Variables de Entorno
const ENV = process.env.NODE_ENV || "development";
const config = require("./config/" + ENV).config;

const bodyParser = require("body-parser");
server.use(bodyParser.json(), CORS());


console.log("Environment =========> ",ENV);
server.listen(config.Port, () => {
    console.log("Servidor escuchando en puerto: " + config.Port);
});

// Routers
const {getProducts,getProductsId,Addproducts,deleteProducts,updateProducts}= require("./routers/products");
const {getUser,AddUser,getUserId,deleteUser,updateUsers}= require('./routers/users');
const {getOrders,AddOrders,getOrdersId,deleteOrder,updateOrders}= require('./routers/orders');
const { log,authenticateUser,isAdmin}= require('./routers/middelwares');  //ensureToken

// Products
server.get('/api/products',authenticateUser,getProducts,(req, res) => {});
server.get('/api/products/:id',authenticateUser,getProductsId,(req, res) => {});
server.delete('/api/products/:id',authenticateUser,deleteProducts,(req, res) =>{});
server.post('/api/products',authenticateUser,Addproducts,(req,res)=> {});
server.patch('/api/products/:id',authenticateUser,updateProducts,(req, res) =>{});
// Users
server.get('/api/users',authenticateUser,isAdmin,getUser,(req, res) => {});
server.post('/api/users',authenticateUser,isAdmin,AddUser,(req,res)=> {});
server.get('/api/users/:id',authenticateUser,isAdmin,getUserId,(req, res) => {});
server.delete('/api/users/:id',authenticateUser,isAdmin,deleteUser,(req, res) =>{});
server.patch('/api/users/:id',authenticateUser,isAdmin,updateUsers,(req, res) =>{});

// Orders
server.get('/api/orders',authenticateUser,getOrders,(req, res) => {});
server.get('/api/orders/:id',authenticateUser,getOrdersId,(req, res) => {});
server.post('/api/orders',authenticateUser,AddOrders,(req, res) => {});
server.delete('/api/orders/:id',authenticateUser,deleteOrder,(req, res) => {});
server.patch('/api/orders/:id',authenticateUser,updateOrders,(req, res) => {});
//log
server.post('/api/login',log,(req, res) => {});


