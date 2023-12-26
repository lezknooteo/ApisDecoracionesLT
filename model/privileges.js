const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config"); 

const Privileges = sequelize.define("Privileges", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Por favor, ingrese el nombre del modulo" },
    },
  }
});



module.exports = Privileges;
