const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Sale = require("../Sales/sales");
const Foods = require("../foods");


const SaleDetailsFoods = sequelize.define("SaleDetailsFoods", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  count:{
    type: DataTypes.INTEGER
  },
  unitPrice:{
    type: DataTypes.FLOAT
  },
  total:{
    type: DataTypes.FLOAT
  }

});
// --------------------------------------
SaleDetailsFoods.belongsTo(Sale, {
  foreignKey: "saleId",
  targetKey: "id",
});

Sale.hasMany(SaleDetailsFoods, {
  foreignKey: "saleId",
  targetKey: "id",
});

// --------------------------------------


SaleDetailsFoods.hasMany(Foods, {
  foreignKey: "foodId",
  targetKey: "id",
});

Foods.hasMany(SaleDetailsFoods, {
  foreignKey: "foodsId",
  targetKey: "id",
});

module.exports = SaleDetailsFoods;
