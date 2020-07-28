const { Products } = require('../db/sequelize');

const getProducts = async (req, res) => {
    try{
        const products = await Products.findAll();
        res.json({
            products,
        });
    } catch (error) {
        console.log(error);
    }

};

const getProductsId = async (req, res) => {
    const productID = req.params.id;
    try{
        const products = await Products.findAll({ 
            where:{ 
              id:  `${productID}`
            }
        });
        res.json({
            products
        });
    } catch (error) {
        console.log(error);
    }

};

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

const updateProduct = async (req, res) => {
    const productID = req.params.id;
    const data = req.body;
    const updated = await Products.update(
        {
            price: data.price,
            packageName:data.packageName,
            description:data.description
        },
        {
            where: {
                id: `${productID}`,
            },
        }
    );
    res.status(200);
    res.send(`Se actualizo el producto`);
};

const deleteProduct = async (req, res) => {
    const productID = req.params.id;
    const deleteProduct = await Products.destroy({
        where: {
            id: productID,
        },
    });
    res.status(200);
    res.send(`Se elemino el producto con id ${productID}`);
};


module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductsId

}
