const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Event = require("../Events/event");
const Service = require("../services");


const EventDetailsServices = sequelize.define("EventDetailsServices", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  count:{
    type: DataTypes.INTEGER
  },
  total:{
    type: DataTypes.FLOAT
  }

});
// --------------------------------------
EventDetailsServices.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(EventDetailsServices, {
  foreignKey: "eventId",
  targetKey: "id",
});

// --------------------------------------


EventDetailsServices.hasMany(Service, {
  foreignKey: "serviceId",
  targetKey: "id",
});

Service.hasMany(EventDetailsServices, {
  foreignKey: "serviceId",
  targetKey: "id",
});

module.exports = EventDetailsServices;
