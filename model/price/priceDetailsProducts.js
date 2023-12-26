const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Price = require("../price/price");
const Product = require("../products");


const PriceDetailsProducts = sequelize.define("PriceDetailsProducts", {
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
PriceDetailsProducts.belongsTo(Price, {
  foreignKey: "priceId",
  targetKey: "id",
});

Price.hasMany(PriceDetailsProducts, {
  foreignKey: "priceId",
  sourceKey: "id",
});

// --------------------------------------


PriceDetailsProducts.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "id",
});

Product.hasMany(PriceDetailsProducts, {
  foreignKey: "productId",
  sourceKey: "id",
});

module.exports = PriceDetailsProducts;
