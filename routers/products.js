// const bodyparser = require('body-parser');
const {sequelize} = require("../bd/conection");

const getProducts = (req, res) => {
    const query = 'SELECT * FROM products';
    sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
        .then((response) => {res.status(200).json(response);
        }).catch((err) => console.log(err));
};

const getProductsId = (req, res) => {
    const id= req.params.id;
    console.log(id);
    const query = 'SELECT * FROM products WHERE id=?';
    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.status(200).json(response);
        }).catch((err) => console.log(err));
};

const Addproducts = (req, res) => {
    const {productName,description, photo, stock, price } = req.body;
    const query = 'INSERT INTO products(productName,description,photo,stock,price) VALUES(?,?,?,?,?)';
    sequelize.query(query, {replacements: [productName, description, photo, stock, price]})
        .then((response) => {res.status(200).json(response);})
        .catch((err) => console.log(err));
};

const deleteProducts = (req, res) => {
        const id= req.params.id;
        const query = 'DELETE  FROM products WHERE id=?';
        sequelize.query(query, { replacements: [id] })
            .then((response) => {
                res.status(200).send(`se elimino el producto con id ${id}`);
            }).catch((err) => console.log(err));
    };

const updateProducts = (req, res) => {
        const id= req.params.id;
        const {productName,description, photo, stock, price } = req.body;

        // const productName= req.body.productName;
        // const description= req.body.description;
        // const photo= req.body.photo;
        // const stock= req.body.stock;
        // const price= req.body.price;

        const query = 'UPDATE products SET productName=?,description =?,photo=?,stock=?,price=? WHERE  id=?';
        sequelize.query(query, { replacements: [productName,description,photo,stock,price,id] })
            .then((response) => {
                res.status(200).send(`se actualizo el producto con id ${id} se inserto ${req.body}`);
            }).catch((err) => console.log(err));
    };

module.exports = {
    getProducts,
    getProductsId,
    Addproducts,
    deleteProducts,
    updateProducts
};