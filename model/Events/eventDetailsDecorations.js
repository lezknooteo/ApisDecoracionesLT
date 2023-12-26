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
EventDetailsDecorations.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(EventDetailsDecorations, {
  foreignKey: "eventId",
  sourceKey: "id",
});

// --------------------------------------


EventDetailsDecorations.belongsTo(Decoration, {
  foreignKey: "decorationId",
  targetKey: "id",
});

Decoration.hasMany(EventDetailsDecorations, {
  foreignKey: "decorationId",
  sourceKey: "id",
});

module.exports = EventDetailsDecorations;
