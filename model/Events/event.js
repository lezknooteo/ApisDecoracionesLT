const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config"); 
const Status = require("../status");
const User = require("../user");

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventDate: {
    type: DataTypes.DATE,
  },
  tel:{
    type: DataTypes.INTEGER
  },
  address: {
    type: DataTypes.STRING(100),
  },
  totalEvent: {
    type: DataTypes.INTEGER,
  },
  payment: {
    type: DataTypes.INTEGER,
  },
  pending: {
    type: DataTypes.INTEGER,
  },
});

Status.hasMany(Event, {
  foreignKey: "stateId",
  sourceKey: "id",
});

Event.belongsTo(Status, {
  foreignKey: "stateId",
  targetKey: "id",
});

Event.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

User.hasMany(Event, {
  foreignKey: "userId",
  sourceKey: "id",
});

module.exports = Event;
