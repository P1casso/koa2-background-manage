module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            username:{
                type: DataTypes.STRING,
                filed:'username',
            },
            password:{
                type: DataTypes.STRING,
                filed:'password',
            },
            phone:{
                type: DataTypes.STRING,
                filed:'phone',
            },
        }
    )
}