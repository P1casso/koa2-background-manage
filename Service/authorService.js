const articleDao = require("../dao/articleDao");
const userDao = require("../dao/userDao");
const encryption = require("../lib/encryption");
const allSqlAction = require("../lib/mysql");
module.exports = {
    saveArticle: async (article) => {
        return await articleDao.addArticle(article);
    },
    //根据用户名查出所有的文章
    getArticlesByAuthor: async (author) => {
        return await articleDao.getArticleByAuthor(author);
    },

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

    deleteArticle: async (id) => {
        let result = await articleDao.deleteArticle(id);
        if (result) {
            return {success: 1, info: "删除文章成功"}
        } else {
            return {success: 0, info: "删除文章失败"}
        }
    },

    getArticlesByIdNeedType: async (id) => {
        let sql = `SELECT DISTINCT news.id,news.title,news.type,news.author,news.addtime,news.picture,news.content,new_type.typename from news  LEFT JOIN new_type ON news.type = new_type.id WHERE news.id = ${id}`
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })

    },
    getArticleByIdUseByUser: async (id) => {
        return await articleDao.getArticleByIdUseByUser(id);
    },
    getArticlesByIdUseByAdmin: async (id) => {
        return await articleDao.getArticleByIdUseByAdmin(id);
    },
    updateArticleById: async (getId, content) => {
        return await articleDao.updateArticleById(getId, content);
    },
    getType: async () => {
        return await articleDao.getType();
    },
    getCommentByUsername: async (username) => {
        let sql = `SELECT comment.id,comment.comment,comment.comment_createtime,user.username,news.title FROM (comment LEFT JOIN user ON comment.comment_userid = user.id) LEFT JOIN news ON comment.comment_articleid = news.id WHERE news.author = '${username}'`
        return allSqlAction.allSqlAction(sql).then(res => {
            if (res.length > 0) {
                return res;
            } else {
                return null;
            }
        })
    }
}