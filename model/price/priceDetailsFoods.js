const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Price = require("../price/price");
const Foods = require("../foods");


const PriceDetailsFoods = sequelize.define("PriceDetailsFoods", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  unitPrice:{
    type: DataTypes.FLOAT
  },
  count:{
    type: DataTypes.INTEGER
  },
  total:{
    type: DataTypes.FLOAT
  }

});
// --------------------------------------
PriceDetailsFoods.belongsTo(Price, {
  foreignKey: "priceId",
  targetKey: "id",
});

Price.hasMany(PriceDetailsFoods, {
  foreignKey: "priceId",
  sourceKey: "id",
});

// --------------------------------------


PriceDetailsFoods.belongsTo(Foods, {
  foreignKey: "foodId",
  targetKey: "id",
});

Foods.hasMany(PriceDetailsFoods, {
  foreignKey: "foodId",
  sourceKey: "id",
});

module.exports = PriceDetailsFoods;
