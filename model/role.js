module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'role',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
            },
            rolename:{
                type: DataTypes.STRING,
                filed:'rolename',
            },

        }
    )
}