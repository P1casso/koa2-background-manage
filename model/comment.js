module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'comment',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
                filed: 'comment',
            },
            comment_articleid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                filed: 'comment_articleid',
            },
            comment_userid: {
                type: DataTypes.INTEGER,
                filed: 'comment_userid',
            },
            comment_createtime:{
                type: DataTypes.DATE,
                filed:'comment_createtime',
            },
        },


    )
}