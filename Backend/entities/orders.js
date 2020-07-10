module.exports = (sequelize, type) => {
  return sequelize.define("orders", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user1: type.INTEGER,
    order_descrition: type.STRING,
    order_status: {
      type: type.ENUM,
      values: ['New', 'Confirmed', 'Prepared','Send','Delivered']
    },
    payment_method:{
      type: type.ENUM,
      values: ['Cash','Card']
    },
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
