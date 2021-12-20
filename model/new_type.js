module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'new_type',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
            },
            typename:{
                type: DataTypes.STRING,
                filed:'typename',
            },

        }
    )
}