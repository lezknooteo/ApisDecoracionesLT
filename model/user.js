const { DataTypes } = require("sequelize");
const {sequelize} = require("../database/config");
const  Status  = require("../model/status");
const  Roles = require("../model/roles");


const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el tipo de documento" },
    },
  },
  document: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el numero de documento" },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del Usuario" },
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el apellido del Usuario" },
    },
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el correo del Usuario" },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese una descripción" },
    },
  },

});

Status.hasMany(User, {
  foreignKey: "stateId",
  sourceKey: "id",
});

User.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});



Roles.hasMany(User, {
  foreignKey: "rolId",
  sourceKey: "id",
});

User.belongsTo(Roles, {
  foreignKey: 'rolId',
  targetKey: 'id'
});




module.exports = User;
