module.exports = {
    session: {
        key: 'koa:sess',
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
        maxAge: 6000000,
    },
    cors: {
        origin: function (ctx) {
            const whiteList = ['http://localhost:3000'];
            console.log(ctx.header.referer);
            let url = ctx.request.url;
            if (ctx.header.referer) {
                url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
            }
            if (whiteList.includes(url)) {
                return url;
            }
            return 'http://localhost:3000';
        },
        maxAge: 8,
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeader: ['Content-Type', 'Authorization', 'Accept'],
        exposeHeader: ['WWW-Authenticate', 'Server-Authorization'],
    },
    jwt: {
        secretKey: "myAppToken",
        TokenExpiredTime: 1000 * 6
    }
}
