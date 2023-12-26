const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const Status = require("../model/status");

const Services = sequelize.define("Services", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del servicio" },
    },
  },

  description: {
    type: DataTypes.STRING(400),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese una descripción" },
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Status.hasMany(Services, {
  foreignKey: "stateId",
  targetKey: "id",
});

Services.belongsTo(Status, {
  foreignKey: "stateId",
  targetKey: "id",
});

module.exports = Services;
