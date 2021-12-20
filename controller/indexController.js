const indexService = require('../Service/indexService')
const authorService = require("../Service/authorService");
const indexPassport = require("../middleWare/indexPassport");

module.exports = {
    index: async (ctx, next) => {
        let CarouselArticles = await indexService.getCarouselArticles();
        let soccerNews = await indexService.getSoccerNews();
        let gameNews = await indexService.getGameNews();
        await ctx.render('user/indexMain', {
            CarouselArticles: CarouselArticles,
            soccerNews: soccerNews,
            gameNews: gameNews,
            user: ctx.state.user,
        });
    },
    //登录
    login: async (ctx, next) => {
        await ctx.render('user/login', {})
    },

    logout: async (ctx, next) => {
        await ctx.logout();
        let CarouselArticles = await indexService.getCarouselArticles();
        let soccerNews = await indexService.getSoccerNews();
        let gameNews = await indexService.getGameNews();
        await ctx.render('user/indexMain', {
            CarouselArticles: CarouselArticles,
            soccerNews: soccerNews,
            gameNews: gameNews,
        })
    },

    checkLogin: async (ctx) => {
        return indexPassport.authenticate('index', async (err, user, info) => {
            if (err) {
                await ctx.render('user/login', {message: "passport本地验证策略错误"})
            }
            if (!user) {
                await ctx.render('user/login', {message: "账号密码错误"})
            } else {
                await ctx.login(user)
                let CarouselArticles = await indexService.getCarouselArticles();
                let soccerNews = await indexService.getSoccerNews();
                let gameNews = await indexService.getGameNews();
                await ctx.render('user/indexMain', {
                    user: ctx.state.user,
                    CarouselArticles: CarouselArticles,
                    soccerNews: soccerNews,
                    gameNews: gameNews,
                });
            }
        })(ctx)
    },

    register: async (ctx, next) => {
        await ctx.render('register', {})
    },

    registerCheck: async (ctx, next) => {
        const userInfo = ctx.request.body;
        let result = await indexService.register(userInfo)
        if (result.success == 1) {
            await ctx.render('user/registerSuccess', {info: result.info});
        } else {
            await ctx.render('register', {info: result.info})
        }
    },

    registerSuccess: async (ctx, next) => {
        await ctx.render('user/registerSuccess')
    },

    error: async (ctx, next) => {
        await ctx.render('error', {message: ctx.session.errorMsg, status: ctx.status})
    },

    viewNew: async (ctx, next) => {
        const id = JSON.parse(JSON.stringify(ctx.query));
        let article = await authorService.getArticleByIdUseByUser(id.id);
        let comment = await indexService.getCommentByArticleId(id.id);
        if (article != null) {
            await ctx.render('user/new', {article: article, comments: comment})
        } else {
            await ctx.render('error', {message: "你没有该权限", status: 403})
        }
    },
    showMoreAboutSoccer: async (ctx, next) => {
        let typename = "足球";
        let typename_EN = "Soccer";
        let articles = await indexService.getAllSoccerNews();
        await ctx.render('showMore', {articles: articles, typename: typename, typename_EN: typename_EN});
    },
    showMoreAboutGame: async (ctx, next) => {
        let typename = "游戏";
        let typename_EN = "Game";
        let articles = await indexService.getAllGameNews();
        await ctx.render('showMore', {articles: articles, typename: typename, typename_EN: typename_EN})
    },
    submitComments: async (ctx, next) => {
        const article_id = JSON.parse(JSON.stringify(ctx.query)).id;
        let content = ctx.request.body
        const comment = Object.assign(content, {comment_articleid: article_id}, {comment_userid: ctx.state.user.id})
        await indexService.submitComments(comment);
        let article = await authorService.getArticleByIdUseByUser(article_id);
        let comments = await indexService.getCommentByArticleId(article_id);
        await ctx.render('new', {article: article, comments: comments})
    },
    searchArticle: async (ctx) => {
        let searchInfo = ctx.request.body;
        let article = await indexService.searchArticle(searchInfo.title);
        await ctx.render('user/search', {articles: article});
    },
}