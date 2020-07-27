

module.exports = (sequelize, type) => {
  return sequelize.define("products", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    packageName: type.STRING,
    description: type.STRING,
    price: type.INTEGER,
    image_Url: type.STRING,

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
