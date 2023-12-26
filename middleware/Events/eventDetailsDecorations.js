const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Event = require("../Events/event");
const Decoration = require("../decorations");


const EventDetailsDecorations = sequelize.define("EventDetailsDecorations", {
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
EventDetailsDecorations.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(EventDetailsDecorations, {
  foreignKey: "eventId",
  targetKey: "id",
});

// --------------------------------------


EventDetailsDecorations.hasMany(Decoration, {
  foreignKey: "decorationId",
  targetKey: "id",
});

Decoration.hasMany(EventDetailsDecorations, {
  foreignKey: "decorationId",
  targetKey: "id",
});

module.exports = EventDetailsDecorations;
