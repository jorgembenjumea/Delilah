const {sequelize} = require("../bd/conection");

const getOrders = (req, res) => {
    const query =   `SELECT users.fullName,users.numberPhone,users.address,
                    products.productName,products.description,products.photo,products.price, 
                    orders.payment,orders.status FROM users
                    JOIN orders 			ON users.id = orders.userId
                    JOIN orders_products 	ON orders_products.orderID = orders.id
                    JOIN products 			ON orders_products.productID = products.id ;`;

    sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
        .then((response) => {res.status(200).json(response);
        }).catch((err) => console.log(err));
};

const AddOrders = (req, res) => {
    const { userId, total, payment, status } = req.body;
    const query = 'INSERT INTO orders (userId, total, payment, status) VALUES(?,?,?, ?)';
    sequelize.query(query, {replacements: [userId, total, payment, status]})
        .then((response) => {res.status(200).json({status: `usuario Ingresado`,user: req.body});})
        .catch((err) => console.log(err));
};

const getOrdersId = (req, res) => {
    const id =req.params.id;
    const query =   `SELECT users.fullName,users.numberPhone,users.address,
    products.productName,products.description,products.photo,products.price, 
    orders.payment,orders.status FROM users
    JOIN orders 			ON users.id = orders.userId
    JOIN orders_products 	ON orders_products.orderID = orders.id
    JOIN products 			ON orders_products.productID = products.id WHERE orders.id =?;`;

    sequelize.query(query, {replacements: [id],  type: sequelize.QueryTypes.SELECT})
        .then((response) => {res.status(200).json(response);
        }).catch((err) => console.log(err));
}; 

const deleteOrder = (req, res) => {
    const id= req.params.id;
    const query = 'DELETE  FROM orders WHERE id =?';
    sequelize.query(query, { replacements:[id] })
        .then((response) => {res.status(200).json(`Order was delete with id ${id}`);
        }).catch((err) => console.log(err));
};

const updateOrders = (req, res) => {
    const id= req.params.id;
    const { userId, total, payment, status } = req.body;
    const query = 'UPDATE orders SET  userId=?, total=?, payment=?, status=? WHERE  id=?';
    sequelize.query(query, { replacements: [userId, total, payment, status ,id] })
        .then((response) => {
            res.status(200).json({status:`se actualizo el producto con id ${id}`, order: req.body});
        }).catch((err) => console.log(err));
};

module.exports ={
    getOrders,
    AddOrders,
    getOrdersId,
    deleteOrder,
    updateOrders  
};