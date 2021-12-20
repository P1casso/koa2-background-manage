const passport = require("../middleWare/passport");
const indexService = require("../Service/indexService");
const encryption = require("../lib/encryption");
const adminService = require("../Service/adminService");
const authorService = require("../Service/authorService");

module.exports = {

    //后台欢迎页面
    index: async (ctx) => {
        await ctx.render('admin/index', {username: ctx.state.user.username})
    },
    //后台用户登录页面
    login: async (ctx) => {
        await ctx.render('admin/login', {})
    },
    //后台用户登录检查
    checkLogin: async (ctx) => {
        return passport.authenticate('local', async (err, user, info) => {
            if (err) {
                ctx.session.errorMsg = "passport本地验证策略错误"
                await ctx.render('admin/login', {message: ctx.session.loginfo})
            }
            if (!user && info == "权限不足") {
                ctx.session.loginfo = "权限不足，您不是管理员"
                await ctx.render('admin/login', {message: ctx.session.loginfo})
            } else if (!user) {
                ctx.session.loginfo = "账号密码错误"
                await ctx.render('admin/login', {message: ctx.session.loginfo})
            } else {
                await ctx.login(user)
                await ctx.render('admin/index', {username: ctx.state.user.username});
            }
        })(ctx)
    },
    logout: async (ctx) => {
        await ctx.logout();
        await ctx.render('admin/login')
    },
    //用户管理
    userManage: async (ctx) => {
        let user = await adminService.getAllUsers();
        let role = await adminService.getRole();
        await ctx.render('admin/userManage', {username: ctx.state.user.username, users: user, roles: role});
    },
    //文章管理
    articleManage: async (ctx) => {
        let article = await adminService.getAllArticles();
        let type = await authorService.getType();
        await ctx.render('admin/articleManage', {articles: article, types: type});
    },
    //评论管理
    commentManage: async (ctx) => {
        let comments = await adminService.getAllComments();
        await ctx.render('admin/commentManage', {comments: comments});
    },

    //新增页面新增用户点击保存
    saveUser: async (ctx) => {
        let userInfo = ctx.request.body;
        let user = await indexService.register(userInfo);
        let roles = await adminService.getRole();
        await ctx.render('admin/addUser', {info: user.info, roles: roles})
    },

    //用户管理页面的新增用户按钮
    addUser: async (ctx) => {
        let roles = await adminService.getRole();
        await ctx.render('admin/addUser', {roles: roles, username: ctx.state.user.username})
    },

    //按条件搜索用户
    searchUser: async (ctx) => {
        let userInfo = ctx.request.body;
        let results = await adminService.searchUserByInfo(userInfo);
        await ctx.render('admin/userManage', {users: results})
    },
    //按条件搜索文章
    searchArticle: async (ctx) => {
        let articleInfo = ctx.request.body;
        let results = await adminService.searchArticleByInfo(articleInfo);
        await ctx.render('admin/articleManage', {articles: results})
    },

    //轮播图管理
    carouselManage: async (ctx) => {
        let article = await adminService.getArticles_isAudit()
        await ctx.render('admin/carouselManage', {articles: article});
    },

    //修改用户点击更新
    updateUser: async (ctx) => {
        let user_old = ctx.request.body;
        const getId = JSON.parse(JSON.stringify(ctx.query));
        let roles = await adminService.getRole();
        let result = await adminService.updateUserById(getId.id, user_old);
        const newUerInfo = await adminService.getUserById(getId.id);
        await ctx.render('admin/editUser', {info: result.info, roles: roles, old_user: newUerInfo})

    },

    //点击修改用户
    editUser: async (ctx) => {
        const id = JSON.parse(JSON.stringify(ctx.query)).id;
        const old_user = await adminService.getUserById(id);
        let roles = await adminService.getRole();
        await ctx.render('admin/editUser', {old_user: old_user, roles: roles});
    },

    //重置用户密码为123456
    resetUserPass: async (ctx) => {
        const id = JSON.parse(JSON.stringify(ctx.query));
        let salt = encryption.generateId();
        let encryPass = await encryption.getMd5Pass("123456", salt);
        let result = await adminService.resetUserPass(id.id, salt, encryPass);
        let user = await adminService.getAllUsers();
        let role = await adminService.getRole();
        await ctx.render('admin/userManage', {
            username: ctx.state.user.username,
            users: user,
            roles: role,
            info: result.info
        });
    },

    //点击通过审核
    approved: async (ctx) => {
        let id = JSON.parse(JSON.stringify(ctx.query));
        let result = await adminService.approved(id.id);
        let article = await adminService.getAllArticles();
        await ctx.render('admin/articleManage', {articles: article, info: result.info});
    },

    //点击设置为违规
    violation: async (ctx) => {
        let id = JSON.parse(JSON.stringify(ctx.query));
        let result = await adminService.violation(id.id);
        let article = await adminService.getAllArticles();
        await ctx.render('admin/articleManage', {articles: article, info: result.info});
    },

    //点击设置为轮播图
    setCarousel: async (ctx) => {
        let id = JSON.parse(JSON.stringify(ctx.query));
        let result = await adminService.setCarousel(id.id);
        let article = await adminService.getArticles_isAudit()
        await ctx.render('admin/carouselManage', {articles: article, info: result.info});
    },

    //点击撤下轮播图
    cancelCarousel: async (ctx) => {
        let id = JSON.parse(JSON.stringify(ctx.query));
        let result = await adminService.cancelCarousel(id.id);
        let article = await adminService.getArticles_isAudit()
        await ctx.render('admin/carouselManage', {articles: article, info: result.info});
    },

    //预览文章
    previewArticle: async (ctx) => {
        const id = JSON.parse(JSON.stringify(ctx.query));
        let article = await authorService.getArticlesByIdUseByAdmin(id.id);
        await ctx.render('admin/previewArticle', {article: article})
    },

    //删除文章
    deleteArticle: async (ctx) => {
        const id = ctx.params.articleId;
        let result = await adminService.deleteArticle(id);
        let article = await adminService.getAllArticles();
        await ctx.render('admin/articleManage', {articles: article, info: result.info});
    },

    //删除评论
    deleteComment: async (ctx) => {
        const id = JSON.parse(JSON.stringify(ctx.query));
        let result = await adminService.deleteComment(id.id);
        let comments = await adminService.getAllComments();
        await ctx.render('admin/commentManage', {comments: comments, result: result.info});
    },
    deleteUser: async (ctx) => {
        const id = JSON.parse(JSON.stringify(ctx.query));
        let result = await adminService.deleteUser(id.id);
        let user = await adminService.getAllUsers();
        let role = await adminService.getRole();
        await ctx.render('admin/userManage', {username: ctx.state.user.username, users: user, roles: role,info: result.info});
    },


}