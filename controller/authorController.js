const authorService = require("../Service/authorService.js");
const adminService = require("../Service/adminService");

module.exports = {

    index: async (ctx, next) => {
        await ctx.render('author/authorIndex', {username: ctx.state.user.username,});
    },
    // login: async (ctx, next) => {
    //     await ctx.render('author/authorLogin', {})
    // },
    // checkLogin: async (ctx, next) => {
    //     return authorPassport.authenticate('author', async (err, user, info) => {
    //         if (err) {
    //             ctx.session.errorMsg = "passport本地验证策略错误"
    //             await ctx.render('author/authorLogin', {message: ctx.session.loginfo})
    //         }
    //         if (!user && info == "您还不是作者，请先注册") {
    //             ctx.session.loginfo = "您还不是作者，请先注册"
    //             await ctx.render('author/authorLogin', {message: ctx.session.loginfo})
    //         } else if (!user) {
    //             ctx.session.loginfo = "账号密码错误"
    //             await ctx.render('author/authorLogin', {message: ctx.session.loginfo})
    //         } else {
    //             await ctx.login(user)
    //             await ctx.render('author/authorIndex', {username: ctx.state.user.username});
    //         }
    //     })(ctx)
    // },
    addArticles: async (ctx, next) => {
        let newType = await authorService.getType();
        await ctx.render('author/addArticles', {username: ctx.state.user.username, newTypes: newType})
    },
    //点击保存文章
    saveArticle: async (ctx, next) => {
        let author = ctx.state.user.username;
        let a = {author};
        let content = ctx.request.body;
        let imagePath = ctx.uploadpath
        const contents = Object.assign(content, imagePath, a);
        let result = await adminService.saveArticle(contents);
        let article = await authorService.getArticlesByAuthor(ctx.state.user.username);
        await ctx.render('author/articleManage', {username: ctx.state.user.username,info:result.info,articles: article});
    },
    updateArticle: async (ctx, next) => {
        let content = ctx.request.body;
        const getId = JSON.parse(JSON.stringify(ctx.query)).id;
        let imagePath = ctx.uploadpath;
        let contents;
        if (imagePath.name == null) {
            contents = content;
        } else {
            contents = Object.assign(content, imagePath);
        }
        await authorService.updateArticleById(getId, contents);
        let article = await authorService.getArticlesByAuthor(ctx.state.user.username);
        await ctx.render('author/articleManage', {articles: article, username: ctx.state.user.username});
    },
    //我的文章
    articleManage: async (ctx, next) => {
        let author = ctx.state.user.username;
        let article = await authorService.getArticlesByAuthor(author);
        await ctx.render('author/articleManage', {articles: article, username: ctx.state.user.username});
    },
    //删除文章
    deleteArticle: async (ctx, next) => {
        const getId = JSON.parse(JSON.stringify(ctx.query)).id;
        let result = await authorService.deleteArticle(getId);
        let article = await authorService.getArticlesByAuthor(ctx.state.user.username);
        await ctx.render('author/articleManage', {username: ctx.state.user.username,info:result.info,articles: article});
    },
    //编辑文章
    editArticle: async (ctx, next) => {
        const getId = JSON.parse(JSON.stringify(ctx.query));
        let article = await authorService.getArticlesByIdNeedType(getId.id);
        let newType = await authorService.getType();
        await ctx.render('author/editArticle', {articles: article,newTypes: newType});
    },
    //预览文章
    previewArticle: async (ctx, next) => {
        const getId = JSON.parse(JSON.stringify(ctx.query));
        let article = await authorService.getArticlesByAuthor(getId.id);
        await ctx.render('author/previewArticle', {article: article, username: ctx.state.user.username});
    },
    commentMe: async (ctx, next) => {
        let username = ctx.state.user.username;
        console.log(username)
        let comments = await authorService.getCommentByUsername(username);
        await ctx.render('author/commentMe', {comments: comments});
    },
}