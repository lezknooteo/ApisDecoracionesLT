const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const  Status  = require("../model/status");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre de la categoria" },
    },
  },
  description: {
    type: DataTypes.STRING(400),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor ingrese una descripción" },
    },
  },
  image: {
    type: DataTypes.STRING, 
    allowNull: false
  },
});

Status.hasMany(Category, {
  foreignKey: "stateId",
  sourceKey: "id",
});

Category.belongsTo(Status, {
  foreignKey: 'stateId',
  targetKey: 'id'
});


module.exports = Category;
