const sequelize = require('sequelize')
const {user,news,newType} = require('../model/index')

module.exports = {
    getNewsByTypeNum:async (newsTypeId,newsNum)=>{
        try {
            let result = await news.findAll({
                limit:newsNum,
                where:{
                  type:newsTypeId
                },

                order:[['content','DESC']],
                // include:[
                //     {model:newType,attributes:[['new_type','newTypeName']]},
                // ]
            })
            return result
        }catch (e) {
            console.log("查找错误"+e);
            return null;

        }
    },
}