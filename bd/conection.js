const express = require("express");
const server = express();
const Sequelize = require("sequelize");

const ENV = process.env.NODE_ENV || "development";
const sqlConf = require("../config/" + ENV).config.MysqlConfig;

const sequelize = new Sequelize(`mysql://${sqlConf.User}:${sqlConf.Password}@${sqlConf.Host}:${sqlConf.Port}/${sqlConf.Db}`);

module.exports={
    sequelize
};
