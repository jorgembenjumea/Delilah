module.exports = (sequelize, type) => {
  return sequelize.define("users", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: type.STRING,
    name: type.STRING,
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






