
const allSqlAction = require('../lib/mysql')
const {user} = require("../model");

module.exports = {
    getAllUsers: async ()=>{
      return await user.findAll({
          raw:true
      });
    },
registerUser: async ()=>{
        return await user.create({

        })
},
    getUserByUser: async (username) => {

        return await user.findOne({
            where: {username},
            raw:true
        })
    }
}