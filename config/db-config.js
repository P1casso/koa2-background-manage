
module.exports = {
    sequelize: {
        host: 'localhost',
        dialect: 'mysql',

        dialectOptions: {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            supportBigNumbers: true,
            bingNumberString: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            freezeTableName: true,
            timestamps: false,
            paranoid: false,
            operatorsAliases: false,
        },
        timezone: '+08:00'
    },
    mysql:{
        database:'koa',
        user:'root',
        password:'1111',
        PORT:'3306',
        host:'localhost',
    }
}