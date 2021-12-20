module.exports = async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.throw(404);
        }
    } catch (error) {
        const status = error.status || 500;
        ctx.status = status;
        if (status === 404) {
            ctx.session.errorMsg = "抱歉，找不到页面"
        } else if (status === 500) {
            ctx.session.errorMsg = ctx.status + "服务器未响应"
        } else if (status === 302) {
            ctx.session.errorMsg = ctx.status + "没有权限"
        } else {
            ctx.session.errorMsg = ctx.status + "ERROR"
        }
        ctx.response.redirect('/error')
    }
}