const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config"); 
const  Status  = require("../model/status");
const  CategoryModel  = require("../model/category");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del producto" },
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
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: { min: 1 },
        msg: "La cantidad debe ser un número entero mayor que cero",
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

Status.hasMany(Product, {
  foreignKey: "stateId",
  targetKey: "id",
});

Product.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});
CategoryModel.hasMany(Product, {
  foreignKey: "categoryId",
  targetKey: "id",
});

Product.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  targetKey: 'id'
});

module.exports = Product;
