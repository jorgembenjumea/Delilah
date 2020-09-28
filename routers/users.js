const {sequelize} = require("../bd/conection");

const getUser = (req, res) => {
    const query = 'SELECT * FROM users';
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
        .then((response) => {res.status(200).json(response);
        }).catch((err) => console.log(err));
};

const getUserId = (req, res) => {
    const id= req.params.id;
    const query = 'SELECT * FROM users WHERE id =?';
    sequelize.query(query, {replacements:[id] ,type: sequelize.QueryTypes.SELECT})
        .then((response) => {res.status(200).json(response);
        }).catch((err) => console.log(err));
};

const AddUser = (req, res) => {
    const { fullName,user,email, password,numberPhone,address, active,isAdmin } = req.body;
    const query = 'INSERT INTO users (fullName,user,email, password,numberPhone,address, active,isAdmin) VALUES(?,?,?, ?,?,?, ?,?)';
    sequelize.query(query, {replacements: [fullName,user,email, password,numberPhone,address, active,isAdmin]})
        .then((response) => {res.status(200).json({status: `usuario Ingresado`,user: req.body});})
        .catch((err) => console.log(err));
};

const deleteUser = (req, res) => {
    const id= req.params.id;
    const query = 'DELETE * FROM users WHERE id =?';
    sequelize.query(query, { replacements:[id] })
        .then((response) => {res.status(200).json(response);
        }).catch((err) => console.log(err));
};

const updateUsers = (req, res) => {
    const { fullName,user,email, password,numberPhone,address, active,isAdmin } = req.body;
    const id= req.params.id;
    const query = 'UPDATE users SET fullName=?,user=?,email=?, password=?,numberPhone=?,address=?, active=?,isAdmin=? WHERE  id=?';
    sequelize.query(query, { replacements: [fullName,user,email, password,numberPhone,address, active,isAdmin,id] })
        .then((response) => {
            res.status(200).json({status:`se actualizo el producto con id ${id}`, user: req.body});
        }).catch((err) => console.log(err));
};


module.exports ={
    getUser,
    AddUser,
    getUserId,
    deleteUser,
    updateUsers
    
};