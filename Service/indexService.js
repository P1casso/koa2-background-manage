const userDao = require('../dao/userDao')
const md5 = require('md5')
module.exports = {
    checkLogin: async (username, password) => {
        let user = await userDao.getUserByUser(username)
        console.log(user)
        if (user) {
            if (user.password ==md5(password)) {
                return user;
            }
        }
        return false;
    },
    getAllUsers:async () => {
       let user = await  userDao.getAllUsers()
        return user;
    }
}