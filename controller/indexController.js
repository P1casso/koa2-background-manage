const indexService = require('../service/indexService')
module.exports = {
    index: async (ctx, next) => {
        await ctx.render('index', {
            title: 'hello koa mvc!'
        })
    },
    login: async (ctx, next) => {
        await ctx.render('login', {})
    },
    register: async (ctx, next) => {
        const {username, password, phone} = ctx.request.body
        console.log(ctx.request.body)
        await ctx.render('register', {})
    },
    checkLogin: async (ctx, next) => {
        const {username, password} = ctx.request.body;
        let user = await indexService.checkLogin(username,password)
        if (user) {
            ctx.session.username = user.username;
            console.log(ctx.session.username)
            ctx.response.redirect('/home')
        } else {
            await ctx.render('login', {info: "账号密码错误",});
        }
    },
    home: async(ctx, next) => {
        await ctx.render('homeIndex', {
            username:ctx.session.username
        });
    },
    logout: async(ctx, next)=>{
        ctx.session.username = null;
        await ctx.render('login',{})
    },
    userManage: async(ctx,next)=>{
        let user = await indexService.getAllUsers();
        await ctx.render('userManage',{username:ctx.session.username,users:user})
    }
}