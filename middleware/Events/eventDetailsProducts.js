const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");
const Event = require("../Events/event");
const Product = require("../products");


const EventDetailsProducts = sequelize.define("EventDetailsProducts", {
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
EventDetailsProducts.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(EventDetailsProducts, {
  foreignKey: "eventId",
  targetKey: "id",
});

// --------------------------------------


EventDetailsProducts.hasMany(Product, {
  foreignKey: "productId",
  targetKey: "id",
});

Product.hasMany(EventDetailsProducts, {
  foreignKey: "productId",
  targetKey: "id",
});

module.exports = EventDetailsProducts;
