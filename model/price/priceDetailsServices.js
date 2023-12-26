const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Price = require("../price/price");
const Service = require("../services");


const PriceDetailsServices = sequelize.define("PriceDetailsServices", {
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
PriceDetailsServices.belongsTo(Price, {
  foreignKey: "priceId",
  targetKey: "id",
});

Price.hasMany(PriceDetailsServices, {
  foreignKey: "priceId",
  sourceKey: "id",
});

// --------------------------------------


PriceDetailsServices.belongsTo(Service, {
  foreignKey: "serviceId",
  targetKey: "id",
});

Service.hasMany(PriceDetailsServices, {
  foreignKey: "serviceId",
  sourceKey: "id",
});

module.exports = PriceDetailsServices;
