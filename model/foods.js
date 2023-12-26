const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const  Status  = require("../model/status");



const Foods = sequelize.define("Foods", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del plato" },
    },
  },
  description: {
    type: DataTypes.STRING(400),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese la descripción del plato" },
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {
        args: { min: 0 },
        msg: "El precio debe ser un número mayor o igual a cero",
      },
    },
  },

  listingPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {
        args: { min: 0 },
        msg: "El precio debe ser un número mayor o igual a cero",
      },
    },
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, 
    allowNull: true
  },
});

Status.hasMany(Foods, {
  foreignKey: "stateId",
  sourceKey: "id",
});

Foods.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});






module.exports = Foods;
