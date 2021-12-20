const config = require('../config/db-config');
const Sequelize = require('sequelize');
const DataTypes = require("sequelize");

const sequelizeObj = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    config.sequelize
);

const user= require('../model/user')(sequelizeObj,DataTypes)
const role= require('../model/role')(sequelizeObj,DataTypes)
const news = require('../model/news')(sequelizeObj,DataTypes)
const new_type=require('../model/new_type')(sequelizeObj,DataTypes)
const comment=require('../model/comment')(sequelizeObj,DataTypes)

role.hasMany(user,{
    foreignKey:'roleid',
    sourceKey:'id'
})

user.belongsTo(role,{
    foreignKey:'roleid',
    targetKey:'id'
})


new_type.hasMany(news,{
    foreignKey:'type',
    sourceKey:'id'
})
news.belongsTo(new_type,{
    foreignKey:'type',
    targetKey:'id'
})

module.exports = {user,role,news,new_type,comment}