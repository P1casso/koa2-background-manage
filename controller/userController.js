const adminService = require("../Service/adminService");
const encryption = require("../lib/encryption");
const indexService = require("../Service/indexService");
module.exports = {
    //账号信息
    myInfo: async (ctx, next) => {
        const id = ctx.state.user.id
        const userInfo = await adminService.getUserById(id);
        await ctx.render('user/myInfo', {userInfo: userInfo});
    },
    //信息修改
    editInfo: async (ctx, next) => {
        const id = ctx.state.user.id
        const userInfo = await adminService.getUserById(id);
        await ctx.render('user/editInfo', {userInfo: userInfo});
    },
    //用户更新个人信息上传
    updateInformation: async (ctx, next) => {
        let userInfo = ctx.request.body;
        const id = ctx.state.user.id
        let result;
        if (userInfo.password === '') {
            delete userInfo.password;
            result = await adminService.updateUserById(id, userInfo);
        } else {
            let salt = encryption.generateId();
            let encryPass = await encryption.getMd5Pass(userInfo.password, salt);
            userInfo.salt = salt;
            userInfo.password = encryPass;
            result = await adminService.updateUserById(id, userInfo);
        }
        const newUerInfo = await adminService.getUserById(id);
        await ctx.render('user/editInfo', {info: result.info, userInfo: newUerInfo})

    },
    //评论管理
    myComment: async (ctx, next) => {
        const id = ctx.state.user.id
        const comments = await indexService.getCommentByUserId(id);
        await ctx.render('user/myComment', {comments: comments});
    },
    //如果用户还不是作者，作者入驻
    authorApply: async (ctx, next) => {
        await ctx.render('user/authorApply');
    },
    //申请成为作者
    becomeAuthor: async (ctx, next) => {
        const roleid = JSON.parse(JSON.stringify(ctx.query)).roleid;
        let userid = ctx.state.user.id
        let result = await adminService.becomeAuthor(userid, roleid);
        if (result) {
            ctx.state.user.roleid = 2;
            await ctx.render('author/authorIndex', {message: "您已成为作者！欢迎你的加入！"})
        } else {
            await ctx.render('error', {message: "错误！！！！", status: ctx.status})
        }
    },
}
