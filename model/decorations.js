const { DataTypes } = require("sequelize");
const {sequelize} = require("../database/config")
const  Status  = require("../model/status");
const  CategoryModel  = require("../model/category");

const Decorations = sequelize.define("Decorations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre de la decoración" },
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
  type:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, 
    allowNull: true
  }
});


Status.hasMany(Decorations, {
  foreignKey: "stateId",
  targetKey: "id",
});

Decorations.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});

CategoryModel.hasMany(Decorations, {
  foreignKey: "categoryId",
  targetKey: "id",
});

Decorations.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  targetKey: 'id'
});

module.exports = Decorations;
