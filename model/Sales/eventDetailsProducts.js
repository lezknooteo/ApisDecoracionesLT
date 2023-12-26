const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Sale = require("../Sales/sales");
const Product = require("../products");


const SaleDetailsProducts = sequelize.define("SaleDetailsProducts", {
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
SaleDetailsProducts.belongsTo(Sale, {
  foreignKey: "saleId",
  targetKey: "id",
});

Sale.hasMany(SaleDetailsProducts, {
  foreignKey: "saleId",
  targetKey: "id",
});

// --------------------------------------


SaleDetailsProducts.hasMany(Product, {
  foreignKey: "productId",
  targetKey: "id",
});

Product.hasMany(SaleDetailsProducts, {
  foreignKey: "productId",
  targetKey: "id",
});

module.exports = SaleDetailsProducts;
