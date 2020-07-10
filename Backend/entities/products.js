

module.exports = (sequelize, type) => {
  return sequelize.define("products", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_Url: type.STRING,
    packageName: type.STRING,
    destination: type.STRING,
    description: type.STRING,
    quantity: type.INTEGER,
    price: type.INTEGER,

    createdAt: {
      allowNull: false,
      type: type.DATE
    },
    updatedAt: {
      allowNull: false,
      type: type.DATE
    },
   
  });
};
