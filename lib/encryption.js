const md5 = require("md5")
const uuid = require("uuid")
const jsonwebtoken = require("jsonwebtoken");
const baseConfig = require("../config/base-config");
module.exports = {
    getUserToken: (payload) => {
        let nowDate = new Date();
        payload.iat = nowDate.getTime();
        const token = jsonwebtoken.sign(payload, baseConfig.jwt.secretKey, {expiresIn: baseConfig.jwt.TokenExpiredTime});
        return token;
    },
    generateId: () => {
        return uuid.v4()
    },
    getMd5Pass: async (val, salt) => {
        let passSalt = md5(md5(val) + salt)
        return passSalt;
    }
}