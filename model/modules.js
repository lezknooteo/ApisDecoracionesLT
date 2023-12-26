const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config"); 
const  Status  = require("../model/status");

const Module = sequelize.define("Module", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del modulo" },
    },
  }
});

Status.hasMany(Module, {
  foreignKey: "stateId",
  targetKey: "id",
});

Module.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});

module.exports = Module;
