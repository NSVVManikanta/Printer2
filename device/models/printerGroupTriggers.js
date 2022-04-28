var  commonHelper = require('../../Helper')
module.exports = (sequelize,Sequelize)=>{


const printerGroupTriggers= sequelize.define(
    'PrinterGroupTriggers',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        field: 'c1',
    },
    printerGroupId:{
        type : Sequelize.INTEGER,
        allowNull : false,
        field:'c2',
    },
    trigger:{
        type : Sequelize.ENUM(1,2,3),
        allowNull : false,
        field:'c3',
    },
    orderType:{
        type : Sequelize.ENUM(1,2),
        allowNull : false,
        field:'c4', 
    },
    createdAt:{
        type: Sequelize.INTEGER,
        field:'c5',
    },
    updatedAt:{
        type: Sequelize.INTEGER,
        allowNull : true,
        field:'c6',
    },
    createdBy:{
        type: Sequelize.INTEGER,
        allowNull : true,
        field:'c7',
        defaultValue: 1
    },
    updatedBy:{
        type: Sequelize.INTEGER,
        allowNull : true,
        field:'c8',
    },
},
{
tableName: 't110',
// hasTrigger: true,
hooks: {
    beforeBulkCreate: function(printerGroupObject, options) {
        return printerGroupObject.map((printer) => {
             printer.createdAt = commonHelper.getTimeStamp();
            return printer;
          })
    },
    beforeUpdate: function(printerGroupObject, options) {
         return   printerGroupObject.updatedAt = commonHelper.getTimeStamp();
    },
}
// hooks: {
//     beforeValidate(printerGroupObject, options){
//         if(printerGroupObject) 
//         return printerGroupObject.createdAt =commonHelper.getTimeStamp();
//     },
    // beforeBulkCreate(printerGroupObject, options){
    //     if(printerGroupObject) 
    //     return printerGroupObject.createdAt =commonHelper.getTimeStamp();
    // },
    //    beforeBulkCreate: function (printerGroupObject,options) {
    //         return printerGroupObject.createdAt =commonHelper.getTimeStamp();
    //    }
    
    // beforeValidate(printerGroupObject, options){
    //     if(!printerGroupObject) 
    //     return printerGroupObject.updatedAt =commonHelper.getTimeStamp();
    // },
//   },
},
);
printerGroupTriggers.associate = function(models){
    printerGroupTriggers.belongsTo(models.PrinterGroups,{foreignKey:"printerGroupId"})
}
return printerGroupTriggers
}
