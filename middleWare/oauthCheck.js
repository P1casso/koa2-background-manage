module.exports = {
    sessionCheck: async (ctx, next) => {
        if (!ctx.state.user) {
            ctx.response.redirect('/login');
        } else {
            await next();
        }
    },

    authorCheck: async (ctx, next) => {
        let roleid = ctx.state.user.roleid;
        console.log(roleid)
        if (ctx.state.user && roleid == 3) {
            ctx.response.redirect('/myInfo');
        } else {
            await next();
        }
    },

    adminCheck: async (ctx, next) => {
        let roleid = ctx.state.user.roleid;
        if (ctx.state.user && roleid != 1) {
            ctx.response.redirect('/admin/login');
        } else {
            await next();
        }
    }
}