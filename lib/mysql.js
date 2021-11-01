const mysql = require("mysql")
const DBConfig = require('../config/db-config')

let pool = mysql.createPool(DBConfig.mysql)

let allSqlAction = (sql, value) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                console.log('链接失败')
                reject(err)
            } else {
                console.log("链接成功")
                connection.query(sql, value, (err, row) => {
                    if (err) reject(err)
                    else {
                        resolve(row)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports = {
    allSqlAction
}