const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const Status = require("../model/status");
const Privileges = require("../model/privileges");
const Modules = require("../model/modules");
const Roles = require("../model/roles");

const Privileges_Modules_Roles = sequelize.define("Privileges_Modules_Roles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

Privileges_Modules_Roles.belongsTo(Status, {
  foreignKey: "stateId",
  targetKey: "id",
});

Status.hasMany(Privileges_Modules_Roles, {
  foreignKey: "stateId",
  sourceKey: "id",
});

Privileges_Modules_Roles.belongsTo(Privileges, {
  foreignKey: "privilegeId",
  targetKey: "id",
});

Privileges.hasMany(Privileges_Modules_Roles, {
  foreignKey: "privilegeId",
  sourceKey: "id",
});

Privileges_Modules_Roles.belongsTo(Modules, {
  foreignKey: "moduleId",
  targetKey: "id",
});

Modules.hasMany(Privileges_Modules_Roles, {
  foreignKey: "moduleId",
  sourceKey: "id",
});

Privileges_Modules_Roles.belongsTo(Roles, {
  foreignKey: "rolesId",
  targetKey: "id",
});

Roles.hasMany(Privileges_Modules_Roles, {
  foreignKey: "rolesId",
  sourceKey: "id",
});

module.exports = Privileges_Modules_Roles;
