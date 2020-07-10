const ENV = process.env.NODE_ENV || "development";
const Sequelize = require("sequelize");
const userModelo = require("../entities/users.js");
const productModelo = require("../entities/products.js");
const orderModelo = require("../entities/orders.js");

const config = require("../config/" + ENV).config.MysqlConfig;
const PortOpcional=3308;

// const sequelize = new Sequelize('mysql://root:root123*@localhost:3308/workshop_viajes');
// const sequelize = new Sequelize(`${config.Dialect}://${config.User}:${config.Password}@${config.Host}:3308/${config.db}`);

const sequelize = new Sequelize(`mysql://root:root123*@localhost:3308/delihaY2`);

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
