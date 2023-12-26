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
EventDetailsProducts.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(EventDetailsProducts, {
  foreignKey: "eventId",
  sourceKey: "id",
});

// --------------------------------------


EventDetailsProducts.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "id",
});

Product.hasMany(EventDetailsProducts, {
  foreignKey: "productId",
  sourceKey: "id",
});

module.exports = EventDetailsProducts;
