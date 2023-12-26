const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Sale = require("../Sales/sales");
const Service = require("../services");


const SaleDetailsServices = sequelize.define("SaleDetailsServices", {
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
SaleDetailsServices.belongsTo(Sale, {
  foreignKey: "saleId",
  targetKey: "id",
});

Sale.hasMany(SaleDetailsServices, {
  foreignKey: "saleId",
  targetKey: "id",
});

// --------------------------------------


SaleDetailsServices.hasMany(Service, {
  foreignKey: "serviceId",
  targetKey: "id",
});

Service.hasMany(SaleDetailsServices, {
  foreignKey: "serviceId",
  targetKey: "id",
});

module.exports = SaleDetailsServices;
