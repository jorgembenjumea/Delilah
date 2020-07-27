const { Products } = require('../db/sequelize');



const addProduct = async (req, res) => {
    const {packageName,description,price,image_Url}= req.body;
    try {
        const newProduct = await Products.create({
            packageName,description,price,image_Url,
        }).then((data) => {
            res.send("Se agrego el producto a la base de datos");
            res.status(200);
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    addProduct

}