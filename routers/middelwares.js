const ENV = process.env.NODE_ENV || "development";
const sqlConf = require("../config/" + ENV).config;

const {sequelize} = require("../bd/conection");
const jwt = require('jsonwebtoken');

const checkUser = async (email, passw) => {
    const query = 'SELECT * FROM users WHERE email=?';
    const foundIt = await sequelize.query(query, {replacements:[email] ,type: sequelize.QueryTypes.SELECT})
    .then((data) => { return  data;})
    .catch(e => console.error('No se encuentra el email', e));

    if (foundIt[0].password != passw){
        return false;
            }
            return foundIt;        
        };

const log = async(req, res,next) => {
    const { email,password } = req.body;
    try {
    const validado = await checkUser(email,password);
    if (!email || !password) {
        res.status(400).json({message: `Faltan datos` });
        return;
    }else if(!validado) {
            res.json({
                errror: " Middleware: El usuario es incorrecto o la contrasenia es invalida",
            });
    }else {
        const token = jwt.sign( // 1:05
            {
                id: validado[0].id,
                address: validado[0].address,
                isAdmin: validado[0].isAdmin,
            }, sqlConf.JwtSecretKey, {expiresIn: sqlConf.JwtExpiresToken}
        );
        res.json({ token });
        next();
    }
}catch (error) {
    res.send("UserLog: error al conectar "+error);
}};

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const checkToken = jwt.verify(token, sqlConf.JwtSecretKey);
        //console.log("req.user addres es igual ====="+checkToken.address);
        if (checkToken) {
            req.infoToken = checkToken;  //Guardo la informacion que trae el token en el payload
            console.log(`El token trae la siguiente info ${checkToken}`);
            return next();
        }
    } catch (err) {
        res.status(401);
        res.send("authenticateUser: Token expirado / Ud no tiene autorizacion para realizar esta accion");
    }
};
const isAdmin = (req, res, next) => {
    let isAdmin = req.infoToken.isAdmin;
    if (!isAdmin) {
        res.status(403);
        res.send("IsAdmin: Ud no tiene autorizacion para realizar esta accion");
    }
    next();
};

module.exports = {
    log,
    isAdmin,
    authenticateUser
};

// Validar que el usuario no este repetido o no exista
// Validar si el cuerpo (body) viene con todos los datoas mandar error  400
// Autenticacion 
// login  si es admin no