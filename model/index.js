const config = require('../config/db-config');
const Sequelize = require('sequelize');
const {QueryTypes, DataTypes} = require("sequelize");

var sequelizeObj = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    config.sequelize
);

const user= require('../model/user')(sequelizeObj,DataTypes)

module.exports = {user}