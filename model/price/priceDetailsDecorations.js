const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Price = require("../price/price");
const Decoration = require("../decorations");


const PriceDetailsDecorations = sequelize.define("PriceDetailsDecorations", {
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
PriceDetailsDecorations.belongsTo(Price, {
  foreignKey: "priceId",
  targetKey: "id",
});

Price.hasMany(PriceDetailsDecorations, {
  foreignKey: "priceId",
  sourceKey: "id",
});

// --------------------------------------


PriceDetailsDecorations.belongsTo(Decoration, {
  foreignKey: "decorationId",
  targetKey: "id",
});

Decoration.hasMany(PriceDetailsDecorations, {
  foreignKey: "decorationId",
  sourceKey: "id",
});

module.exports = PriceDetailsDecorations;
