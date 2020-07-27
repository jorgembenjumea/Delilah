const { Users } = require('../db/sequelize');
const jwt = require("jsonwebtoken");

const getUserFromDB = async (req, res, next) => {
    let getUser = await Users.findAll();
    res.json({
        users: getUser,
    });
    next();
};

const addUserToDB = async (req, res) => {
    const { username, name, phone, address,email, password, isAdmin } = req.body;
    try {
        Users.create({
            username,
            name,
            phone,
            address,
            email,
            password,
            isAdmin,
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
    console.log(req.body)
    try {
        const validado = await checkUser(username, password);
        if (!validado) {
            res.json({
                errror: "El usuario es incorrecto o la contrasenia es invalida",
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
                secret
            );

            res.json({ token });
        }
        next();
    } catch (error) {
        res.send("error al conectar "+error);
    }
};


const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const checkToken = jwt.verify(token, secret);
        if (checkToken) {
            req.usuario = checkToken;
            return next();
        }
    } catch (err) {
        res.status(401);
        res.send("Token expirado / Ud no tiene autorizacion para realizar esta accion");
    }
};

const isAdmin = (req, res, next) => {
    let isAdmin = req.usuario.isAdmin;

    if (!isAdmin) {
        res.status(403);
        res.send("Ud no tiene autorizacion para realizar esta accion");
    }
    next();
};



const secret = "e2emrtwrdDeLiLah*";
module.exports = {
    addUserToDB,
    logUser,
    authenticateUser,
    isAdmin,
    getUserFromDB


}