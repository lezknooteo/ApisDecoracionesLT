const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config"); 
const Status = require("../status");
const User = require("../user");

const Sale = sequelize.define("Sale", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  creationDate: {
    type: DataTypes.DATE,
  },
  SaleDate: {
    type: DataTypes.DATE,
  },
  address: {
    type: DataTypes.STRING(100),
  },
  totalSale: {
    type: DataTypes.INTEGER,
  }
});

Status.hasMany(Sale, {
  foreignKey: "stateId",
  targetKey: "id",
});

Sale.belongsTo(Status, {
  foreignKey: "stateId",
  targetKey: "id",
});

Sale.hasOne(User, {
  foreignKey: "userId",
  targetKey: "id",
});

User.hasMany(Sale, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = Sale;
