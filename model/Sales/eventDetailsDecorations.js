const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Sale = require("../Sales/sales");
const Decoration = require("../decorations");


const SaleDetailsDecorations = sequelize.define("SaleDetailsDecorations", {
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
SaleDetailsDecorations.belongsTo(Sale, {
  foreignKey: "saleId",
  targetKey: "id",
});

Sale.hasMany(SaleDetailsDecorations, {
  foreignKey: "saleId",
  targetKey: "id",
});

// --------------------------------------


SaleDetailsDecorations.hasMany(Decoration, {
  foreignKey: "decorationId",
  targetKey: "id",
});

Decoration.hasMany(SaleDetailsDecorations, {
  foreignKey: "decorationId",
  targetKey: "id",
});

module.exports = SaleDetailsDecorations;
