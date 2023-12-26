const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config"); 
const  Status  = require("../model/status");

const Roles = sequelize.define("Roles", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del rol" },
    },
  }
});

Status.hasMany(Roles, {
  foreignKey: "stateId",
  targetKey: "id",
});

Roles.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});

module.exports = Roles;
