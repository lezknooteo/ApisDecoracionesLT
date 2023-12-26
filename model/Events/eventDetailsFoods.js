const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Event = require("../Events/event");
const Foods = require("../foods");


const EventDetailsFoods = sequelize.define("EventDetailsFoods", {
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
EventDetailsFoods.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(EventDetailsFoods, {
  foreignKey: "eventId",
  sourceKey: "id",
});

// --------------------------------------


EventDetailsFoods.belongsTo(Foods, {
  foreignKey: "foodId",
  targetKey: "id",
});

Foods.hasMany(EventDetailsFoods, {
  foreignKey: "foodId",
  sourceKey: "id",
});

module.exports = EventDetailsFoods;
