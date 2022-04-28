

var  commonHelper = require('../../Helper');
module.exports = (sequelize,DataTypes)=>{
const printerGroups= sequelize.define(
    'PrinterGroups',{
    id:{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        field: 'c1',
    },
    title:{
        type : DataTypes.STRING,
        allowNull : true,
        field:'c2',
    },
    description:{
        type : DataTypes.STRING,
        allowNull : true,
        field:'c3',
    },
    printType:{
        type : DataTypes.ENUM(1,2),
        allowNull : false,
        field:'c4', 
    },
    printerCount:{
        type : DataTypes.INTEGER,
        allowNull : true,
        field:'c5',
    },
    createdAt:{
        type: DataTypes.INTEGER,
        field:'c6',
    },
    updatedAt:{
        type: DataTypes.INTEGER,
        allowNull : true,
        field:'c7',
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull : false,
        defaultValue: 1,
        field:'c8',
    },
    updatedBy:{
        type: DataTypes.INTEGER,
        allowNull : true,
        field:'c9',
    },
    activeStatus:{
        type : DataTypes.BOOLEAN,
        allowNull : true,
        field:'c10',
    },
   
},
{
tableName: 't109',
// hasTrigger: true,
hooks: {
     beforeCreate(printerGroupObject, options){
            if(printerGroupObject) 
         return printerGroupObject.createdAt =commonHelper.getTimeStamp();
     },
     beforeUpdate(printerGroupObject,options){
        if(printerGroupObject) 
        return printerGroupObject.updatedAt =commonHelper.getTimeStamp();
     }
//     beforeCreate(printerGroupObject, options){
//         return printerGroupObject.createdAt =commonHelper.getTimeStamp();
//     },
//     beforeBulkUpdate: function(printerGroupObject, options) {
//         return   printerGroupObject.updatedAt = commonHelper.getTimeStamp();
//    },

}
//   },
    //  hooks: {
    //     beforeCreate : (record, options) => {
    //         console.log(record,"beforeCreate");
    //         record.dataValues.createdAt = commonHelper.getTimeStamp();

    //     },
    //     beforeUpdate : (record, options) => {
    //         record.dataValues.updatedAt = commonHelper.getTimeStamp();
    //     }
        // beforeValidate(printerGroupObject, options){
        //     if(printerGroupObject) {
        //     let createdAt = printerGroupObject.createdAt =commonHelper.getTimeStamp();
        //     let updatedAt = printerGroupObject.updatedAt =commonHelper.getTimeStamp();
        //     return {createdAt,updatedAt};
        //     }
        // },
    //   },
}
);
// printerGroups.beforeCreate(printerGroup => {
//    console.log(printerGroup,"create!");
//   });
printerGroups.associate = function(models){
    printerGroups.hasMany(models.PrinterGroupTriggers,{foreignKey:"printerGroupId"})
}
return printerGroups;
}

