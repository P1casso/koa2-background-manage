const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const authorService = require("../Service/authorService");
passport.use('index', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },

    async function (username, password, done) {
        let result = await authorService.CheckLogin(username, password)
        if (result) {
            return done(null, result, "登陆成功")
        } else {
            return done(null, false, "用户名或密码错误")
        }
    },
));

passport.serializeUser(function (user, done) {
    user.password = '';
    user.salt = '';
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})
module.exports = passport;
