const userDao = require('../dao/userDao')
const encryption = require('../lib/encryption')
// const Sequelize = require('sequelize')
const {user, comment, news} = require("../model");
// const Op = Sequelize.Op;
const articleDao = require("../dao/articleDao");
const allSqlAction = require("../lib/mysql");
module.exports = {
    //登录检查
    checkLogin: async (username, password) => {
        let user = await userDao.getUserByUser(username);
        if (user) {
            let encryPass = await encryption.getMd5Pass(password, user.salt);
            if (encryPass == user.password) {
                return user;
            }
        }
        return null
    },
    //管理员的添加账号和用户的注册都用这个
    register: async (userInfo) => {
        let userExist = await userDao.getUserByUser(userInfo.username);
        if (!userExist) {
            let salt = encryption.generateId();
            if (userInfo.password == null) {
                userInfo.password = '123456';
            }
            let encryPass = await encryption.getMd5Pass(userInfo.password, salt);
            userInfo.salt = salt;
            userInfo.password = encryPass;
            let result = await userDao.createUser(userInfo);
            if (result) {
                return {success: 1, info: "创建用户成功"}
            } else {
                return {success: 0, info: "创建用户失败"}
            }
        } else {
            return {success: 0, info: "用户名已存在"}
        }
    },
    //获得轮播图
    getCarouselArticles: async () => {
        //左查询获得轮播图，并拿到轮播图文章的种类
        let sql = "select DISTINCT news.id,news.title,news.author,news.addtime,news.picture,news.content,new_type.typename FROM news  LEFT JOIN new_type ON news.type = new_type.id WHERE  news.isCarousel= '1'"
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })
    },
    //获得首页的足球新闻
    getSoccerNews: async () => {
        let soccerNews = await articleDao.getSoccerNews();
        return soccerNews;
    },
    //获得首页的游戏新闻
    getGameNews: async () => {
        let gameNews = await articleDao.getGameNews();
        return gameNews;
    },
    //获取所有的足球新闻
    getAllSoccerNews: async () => {
        let soccerNews = await articleDao.getAllSoccerNews();
        return soccerNews;

    },
    //获取所有的游戏新闻
    getAllGameNews: async () => {
        let gameNews = await articleDao.getAllGameNews();
        return gameNews;

    },
    //提交评论
    submitComments: async (comment) => {
        let result = await articleDao.submitComments(comment)
        return result;
    },
    //根据文章id获得评论
    getCommentByArticleId: async (id) => {
        let sql = `SELECT comment.id,comment.comment,comment.comment_createtime,user.username FROM (comment LEFT JOIN user ON comment.comment_userid = user.id) LEFT JOIN news ON comment.comment_articleid = news.id WHERE comment.comment_articleid =${id}`;
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })
    },
    //根据用户id获得品论
    getCommentByUserId: async (id) => {
        let sql = `SELECT comment.id,comment.comment,comment.comment_createtime,news.title FROM (comment LEFT JOIN user ON comment.comment_userid = user.id) LEFT JOIN news ON comment.comment_articleid = news.id WHERE user.id = ${id}`;
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })
    },
    searchArticle:async (title)=>{
       let sql =  `select * from news where title like '%${title}%'`;
        console.log(sql)
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })
    }
}