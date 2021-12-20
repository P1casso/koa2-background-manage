const {news, comment, new_type} = require("../model");

module.exports = {
    //文件管理列出所有文章
    getAllArticles: async () => {
        return await news.findAll(
            {
                raw: true
            }
        );
    },

    //用户专用的查找用户
    getArticleByIdUseByUser: async (id) => {
        return await news.findOne(
            {
                raw: true,
                where: {
                    id: id,
                    isAudit: 1
                }
            }
        );
    },

    //获取轮播图
    getCarouselArticles: async () => {
        return await news.findAll(
            {
                raw: true,
                where: {
                    isCarousel: 1
                }
            }
        );
    },

    updateArticleById: async (getId, content,) => {
        return await news.update(
            {
                title: content.title,
                type: content.type,
                content: content.content,
                picture: content.picture,
                isAudit: 0,
            },
            {
                where: {
                    id: getId,
                }
            }
        );
    },

    //添加文章
    addArticle: async (article) => {
        try {
            let result = await news.create(article);
            return result
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    getArticleByIdUseByAdmin: async (id) => {
        return await news.findOne(
            {
                raw: true,
                where: {
                    id: id,
                }
            }
        );

    },

    //根据作者名字查找作者的所有文章
    getArticleByAuthor: async (author) => {
        try {
            let result = await news.findAll(
                {
                    raw: true,
                    where: {
                        author
                    }
                }
            );
            return result
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    //删除文章
    deleteArticle: async (id) => {
        try {
            return await news.destroy(
                {
                    where: {
                        id
                    }
                }
            )
        } catch (e) {
            console.log(e);
            return false;
        }
    },
    approved: async (id) => {
        return await news.update(
            {
                isAudit: 1
            },
            {
                where: {
                    id: id
                }
            }
        )
    },
    violation: async (id) => {
        return await news.update(
            {
                isAudit: 2
            },
            {
                where: {
                    id: id
                }
            }
        )
    },
    getNumberOfCarousel: async () => {
        return await news.count({
            where: {
                isCarousel: 1
            }
        })
    },
    getArticleBySearchInfo: async (query) => {
        try {
            return await news.findAll({
                raw: true,
                where: query,
                attributes: ["id", "title", "isAudit", "author", "type"],
            });
        } catch (error) {
            console.log("查找用户错误" + error)
            return null
        }
    },
    getCommentBySearchInfo: async (query) => {
        try {
            return await comment.findAll({
                raw: true,
                where: query,
                attributes: ["id", "comment", , "comment_articleid", "comment_userid", "comment_createtime"],
            });
        } catch (error) {
            console.log("查找用户错误" + error)
            return null
        }
    },
    getSoccerNews: async () => {
        try {
            return await news.findAll({
                raw: true,
                limit: 6,
                order: [['id', 'DESC']],
                where: {
                    type: "1",

                },
            });
        } catch (error) {
            console.log("查找足球新闻错误" + error)
            return null
        }
    },
    getAllSoccerNews: async () => {
        try {
            return await news.findAll({
                raw: true,
                order: [['id', 'DESC']],
                where: {
                    type: "1",
                    isAudit: '1',
                },
            });
        } catch (error) {
            console.log("查找足球新闻错误" + error)
            return null
        }
    },

    getAllGameNews: async () => {
        try {
            return await news.findAll({
                raw: true,
                order: [['id', 'DESC']],
                where: {
                    type: "2",
                    isAudit: '1',
                },
            });
        } catch (error) {
            console.log("查找游戏新闻错误" + error)
            return null
        }
    },

    submitComments: async (a) => {
        console.log(a)
        try {
            return await comment.create(a);
        } catch (error) {
            console.log("提交评论错误" + error)
            return null
        }
    },
    getCommentByArticleId: async (id) => {
        try {
            return await comment.findAll({
                raw: true,
                where: {
                    comment_articleid: id
                }
            });
        } catch (error) {
            console.log("查找评论错误" + error)
            return null
        }
    },

    getType: async () => {
        try {
            return await new_type.findAll({
                raw: true,
            });
        } catch (error) {
            console.log("查找类型错误" + error)
            return null
        }
    },

    getGameNews: async () => {
        try {
            return await news.findAll({
                raw: true,
                limit: 6,
                order: [['id', 'DESC']],
                where: {
                    type: "2",
                    isAudit: '1',
                },
            });
        } catch (error) {
            console.log("查找游戏新闻错误" + error)
            return null
        }
    },

}