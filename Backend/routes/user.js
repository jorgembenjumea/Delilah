const { Users } = require('../db/sequelize');
const jwt = require("jsonwebtoken");

const ENV = process.env.NODE_ENV || "development"
const config = require("../config/" + ENV).config


const getUserFromDB = async (req, res) => {
    try{
        let getUser = await Users.findAll();
        console.log(getUser);
        let respu= await res.json({
            users: getUser
        });
        return respu;
        
    }catch (err) {
        res.json({
            error: err,
            message: "getUserFromDB: No se pudo Conectar a la BD"
        });
};
}

const addUserToDB = async (req, res) => {
    const { username, name, phone, address,email, password, isAdmin } = req.body;
    try {
        Users.create({ username, name, phone,address,email,password,isAdmin,
        }).then((users) => {
            res.send(`Se agrego el usuario: ${username} a la base de datos con el id ${users.id}`);
        });
    } catch (err) {
        res.json({
            error: err,
        });
    }
};

const checkUser = async (a, b) => {
    const foundIt = await Users.findOne({ where: { username: `${a}` } });
    if (foundIt.password != b) {
        return false;
    }
    return foundIt;        
};

// Autenticacion del Usuario loging
const logUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const validado = await checkUser(username, password);
        if (!validado) {
            res.json({
                errror: " Middleware: El usuario es incorrecto o la contrasenia es invalida",
            });
            return;
        } else {
            const token = jwt.sign( // 1:05
                {
                    username,
                    id: validado.id,
                    address: validado.address,
                    isAdmin: validado.isAdmin,
                    
                },
                config.JwtSecretKey,
                {
                     expiresIn: config.JwtExpiresToken  //Una Hora
                }
            );
            res.json({ token });
        }
        next();
    } catch (error) {
        res.send("UserLog: error al conectar "+error);
    }
};

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const checkToken = jwt.verify(token, config.JwtSecretKey);
        if (checkToken) {
            req.usuario = checkToken;
            return next();
        }
    } catch (err) {
        res.status(401);
        res.send("authenticateUser: Token expirado / Ud no tiene autorizacion para realizar esta accion");
    }
};

const isAdmin = (req, res, next) => {
    
    let isAdmin = req.usuario.isAdmin;
    console.log(isAdmin);
    if (!isAdmin) {
        res.status(403);
        res.send("IsAdmin: Ud no tiene autorizacion para realizar esta accion");
    }
    next();
};


module.exports = {
    addUserToDB,
    logUser,
    authenticateUser,
    isAdmin,
    getUserFromDB


}