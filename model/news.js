module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'news',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            title:{
                type: DataTypes.STRING,
                filed:'title',
            },
            author:{
                type: DataTypes.STRING,
                filed:'author',
            },
            addtime:{
                type: DataTypes.DATE,
                filed:'addtime',
            },
            type:{
                type: DataTypes.STRING,
                filed:'type',
            },
            picture:{
                type: DataTypes.TEXT,
                filed:'picture',
            },
            content:{
                type: DataTypes.TEXT,
                filed:'type',
            },
            isCarousel:{
                type: DataTypes.STRING,
                filed:'isCarousel',
            },
            isAudit:{
                type: DataTypes.STRING,
                filed:'isAudit',
            },


        }
    )
}