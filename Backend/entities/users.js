module.exports = (sequelize, type) => {
  return sequelize.define("users", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: type.STRING,   
    name: type.STRING,
    phone: type.STRING,
    address: type.STRING,
    isAdmin: type.BOOLEAN,
    email: {
      type: type.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: type.STRING,
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

// username, name,phone, address, email, password




