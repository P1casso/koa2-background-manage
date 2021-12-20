const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const adminService = require("../Service/adminService")
const baseConfig = require("../config/base-config");
const userService = require("../Service/adminService");
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts={}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=baseConfig.jwt.secretKey;
passport.use(new jwtStrategy(opts, async (jwt_payloads, done) => {
    console.log(jwt_payloads)
    let nowDate = new Date();
    if (nowDate.getTime() <= jwt_payloads.exp) {
        const user = await userService.getUserById(jwt_payloads.userid);
        if (user) {
            return done(null, user, 'success');
        } else {
            return done(null, false, 'false');
        }
    } else {
        return done(null, false, '过期了');
    }

}));
// passport.use(new jwtStrategy(opts,async (jwt_payloads,done)=>{
//     let nowDate=new Date();
//     if (nowDate.getTime()<=jwt_payloads.exp) {
//         const user = await userService.getUserById(jwt_payloads.userid);
//         if (user) {
//             return done(null, user, 'success');
//         } else {
//             return done(null, false, 'false');
//         }
//     }else {
//         return done(null,false,'过期了');
//     }
//
// }));

passport.use('local',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    //后台登录验证
    async function (username, password, done) {
        let result = await adminService.CheckLogin(username, password);
        if (result && result.roleid === 1) {
            return done(null, result, "登陆成功")
        } else if (
            result && result.roleid !== 1
        ) {
            return done(null, false, "权限不足")
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
