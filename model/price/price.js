const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config"); 
const Status = require("../status");
const User = require("../user");

const Price = sequelize.define("Price", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  priceDate: {
    type: DataTypes.DATE,
  },
  tel:{
    type: DataTypes.INTEGER
  },
  address: {
    type: DataTypes.STRING(100),
  },
  totalPrice: {
    type: DataTypes.INTEGER,
  },
  payment: {
    type: DataTypes.INTEGER,
  },
  pending: {
    type: DataTypes.INTEGER,
  },
});

Status.hasMany(Price, {
  foreignKey: "stateId",
  sourceKey: "id",
});

Price.belongsTo(Status, {
  foreignKey: "stateId",
  targetKey: "id",
});

Price.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

User.hasMany(Price, {
  foreignKey: "userId",
  sourceKey: "id",
});

module.exports = Price;
