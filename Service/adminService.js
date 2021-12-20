const userDao = require('../dao/userDao')
const encryption = require('../lib/encryption')
const Sequelize = require('sequelize')
const articleDao = require("../dao/articleDao");
const {news, comment, user} = require("../model");
const allSqlAction = require("../lib/mysql");
const Op = Sequelize.Op;
module.exports = {

    // checkLogin: async (username, password) => {
    //     let user = await userDao.getUserByUser(username)
    //     if (user) {
    //         let encryPass = await encryption.getMd5Pass(password, user.salt)
    //         if (encryPass === user.password) {
    //             return user
    //         }
    //     }
    //     return user;
    // },
    //后台登录验证
    CheckLogin: async (username, password) => {
        let user = await userDao.getUserByUser(username)
        if (user) {
            let encryPass = await encryption.getMd5Pass(password, user.salt)
            if (encryPass == user.password) {
                return user;
            }
        } else {
            return null;
        }
    },
    //获得所有的用户
    getAllUsers: async () => {
        return await userDao.getAllUsers();
    },
    //显示所有的新闻
    getAllArticles: async () => {
        return await articleDao.getAllArticles();
    },
    //显示已经通过审核的文章
    getArticles_isAudit: async () => {
        return await news.findAll({
            where: {
                isAudit: 1
            }
        });
    },
    //保存文章
    saveArticle: async (article) => {
        let result = await articleDao.addArticle(article)
        if (result){
            return {success: 1, info: "新建文章成功，请耐心等待管理员审核"}
        }else {
            return {success: 0, info: "新建文章失败,请重试"}
        }
    },

    getRole: async () => {
        return await userDao.getRole();
    },

    updateUserById: async (id, userInfo) => {
        let result = await userDao.updateUserById(id, userInfo);
        if (result) {
            return {success: 1, info: "修改用户信息成功"}
        } else {
            return {success: 0, info: "修改用户信息失败"}
        }
    },

    resetUserPass: async (id, salt, encryPass) => {
        let result = await userDao.resetUserPass(id, salt, encryPass);
        if (result) {
            return {success: 1, info: "重置用户密码成功"}
        } else {
            return {success: 0, info: "重置用户密码失败，请重试"}
        }
    },

    searchUserByInfo: async (searchInfo) => {
        const likeQuery = ['username', 'phone']
        for (let key in searchInfo) {
            if (searchInfo[key] === '' || searchInfo[key] === undefined) delete searchInfo[key];
            else {
                if (likeQuery.includes(key)) {
                    searchInfo[key] = {
                        [Op.like]: `%${searchInfo[key]}%`
                    }
                }

            }
        }
        return await userDao.getUserBySearchInfo(searchInfo);
    },

    searchArticleByInfo: async (searchInfo) => {
        const likeQuery = ['title', 'author']
        for (let key in searchInfo) {
            if (searchInfo[key] === '' || searchInfo[key] === undefined) delete searchInfo[key];
            else {
                if (likeQuery.includes(key)) {
                    searchInfo[key] = {
                        [Op.like]: `%${searchInfo[key]}%`
                    }
                }
            }
        }
        return await articleDao.getArticleBySearchInfo(searchInfo);
    },

    getUserById: async (id) => {
        return await userDao.getUserById(id);
    },
    //通过审核
    approved: async (id) => {
        let result = await articleDao.approved(id);
        if (result) {
            return {success: 1, info: "修改成功"}
        } else {
            return {success: 0, info: "修改失败"}
        }
    },

    violation: async (id) => {
        let result = await articleDao.violation(id);
        if (result){
            return {success: 1, info: "修改成功"}
        }else {
            return {success: 0, info: "修改失败"}
        }
    },


    //设置轮播图
    setCarousel: async (id) => {
        let NumberOfCarousel = await articleDao.getNumberOfCarousel();
        console.log(NumberOfCarousel);
        if (NumberOfCarousel >= 6) {
            return {success: 0, info: "轮播图数量超过6张"}
        } else {
            let result = await news.update({
                isCarousel: 1
            }, {
                where: {
                    id: id
                }
            });
            if (result) {
                return {success: 1, info: "设置轮播图成功"}
            } else {
                return {success: 0, info: "设置轮播图失败"}
            }
        }
    },

    //取消轮播图
    cancelCarousel: async (id) => {
        let NumberOfCarousel = await articleDao.getNumberOfCarousel();
        if (NumberOfCarousel < 5) {
            return {success: 0, info: "轮播图数量应该大于4张"}
        } else {
            let result = await news.update({
                isCarousel: 0
            }, {
                where: {
                    id: id
                }
            });
            if (result) {
                return {success: 1, info: "设置轮播图成功"}
            } else {
                return {success: 0, info: "设置轮播图失败"}
            }
        }
    },

    deleteArticle: async (id) => {
        try {
            let result = await news.destroy({
                where: {
                    id: id
                }
            })
            await comment.destroy({
                where: {
                    comment_articleid: id
                }
            })
          if (result) {
              return {success: 1, info: "删除成功"}
          } else {
              return {success: 0, info: "删除失败"}
          }
        } catch (e) {
            return {success: 0, info: "删除失败"}
        }

    },

    getAllComments: async () => {
        let sql = "SELECT comment.id,comment.comment,comment.comment_createtime,user.username,news.title FROM (comment LEFT JOIN user ON comment.comment_userid = user.id) LEFT JOIN news ON comment.comment_articleid = news.id"
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })
    },

    //管理员删除评论
    deleteComment: async (id) => {
        try {
            let result = await comment.destroy({
                where: {
                    id: id
                }
            })
            if (result) {
                return {success: 1, info: "删除评论成功"}
            }
        } catch (e) {
            return {success: 0, info: "删除评论失败"}
        }

    },

    becomeAuthor: async (userid, roleid) => {

        return await user.update(
            {
                roleid: roleid
            },
            {
                where: {
                    id: userid
                }
            }
        );
    },
    deleteUser:async (id)=>{
        try {
            let result = await user.destroy({
                where: {
                    id: id
                }
            })
            if (result) {
                return {success: 1, info: "删除用户成功"}
            }
        } catch (e) {
            return {success: 0, info: "删除用户失败"}
        }
    },
}