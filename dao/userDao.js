const {user, role} = require("../model");
const sequelize = require('sequelize');
const {query} = require("koa/lib/request");
const {Include} = require("nunjucks/src/nodes");

module.exports = {
    getAllUsers: async () => {
        return await user.findAll({
            raw: true
        });
    },

    registerUser: async (username, password, phone) => {
        let result = await user.findOne({
            raw: true,
            where: {
                username,
            }
        })
        if (result) {
            return {
                status: false,
                message: "Username already exists"
            }
        } else {

            //执行插入语句
            //INSERT INTO `user` (`id`,`username`,`password`,`phone`) VALUES (DEFAULT,?,?,?);
            await user.create({
                username,
                password,
                phone
            })
            return {
                status: true,
                message: "User created successfully",

            }
        }
    },
    getUserByUser: async (username) => {
        try {
            let result = await user.findOne({
                raw: true,
                where: {
                    username,
                }
            })
            return result
        } catch (error) {
            console.log("查找用户错误" + error)
        }
    },
    updateUserById: async (id, userinfo) => {
        return await user.update(
            {
                username: userinfo.username,
                phone: userinfo.phone,
                roleid: userinfo.roleid,
                salt:userinfo.salt,
                password:userinfo.password
            },
            {
                where: {
                    id: id
                }
            }
        );
    },
    getUserById: async (id) => {
        try {
            let result = await user.findOne({
                raw: true,
                where: {
                    id,
                }
            })
            return result
        } catch (error) {
            console.log("查找用户错误" + error)
        }
    },

    getUserBySearchInfo: async (query) => {
        try {
            let result = await user.findAll({
                raw: true,
                where: query,
                attributes: ["id", "username", "phone", "roleid"],
            });
            return result;
        } catch (error) {
            console.log("查找用户错误" + error)
            return null
        }
    },

    createUser: async (data) => {
        try {
            let result = await user.create(data)
            return result
        } catch (error) {
            console.log("创建用户错误" + error)
            return null;
        }
    },
    getRole: async () => {
        return await role.findAll({
            raw: true
        });
    },
    resetUserPass: async (id, salt, encryPass) => {
        return await user.update(
            {
                salt: salt,
                password: encryPass,
            },
            {
                where: {
                    id: id
                }
            }
        )
    },

}