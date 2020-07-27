const Sequelize = require("sequelize"); // Sequelize
const ENV = process.env.NODE_ENV || "development"; // Entorno
const config = require("../config/" + ENV).config.MysqlConfig; // Variables de configuracion

// Importar las Entities
const userModelo = require("../entities/users.js");
const productModelo = require("../entities/products.js");
const orderModelo = require("../entities/orders.js");

 const sequelize = new Sequelize(config.Db, config.User, config.Password,{
   host: config.Host,
   dialect: config.Dialect,
   port: config.Port,
   operatorsAliases:false
 });

// const                 Conexion     sequelize 
const Users = userModelo(sequelize, Sequelize);
const Products = productModelo(sequelize, Sequelize);
const Orders = orderModelo(sequelize, Sequelize);

// Relaciones uno a muchos
Users.hasMany(Orders, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});
// Relaciones muchos a muchos
Orders.belongsToMany(Products, {through:'Orders_Products'});
Products.belongsToMany(Orders, {through:'Orders_Products'});


sequelize.sync({ force: false }).then(() => {
  console.log(`Base de datos y tablas creadas!`);
});

module.exports = {
  Users,
  Products,
  Orders
};
