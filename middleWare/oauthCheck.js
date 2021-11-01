module.exports={
    sessionCheck:async (ctx, next) => {
        if(!ctx.session.username){
            ctx.response.redirect('/login');
        }else {
            await next();
        }
    }
}