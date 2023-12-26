const { response } = require("express");

const RolModel = require("../model/roles");
const PMRModel = require("../model/privileges_modules_roles");
const PrivilegiosModel = require("../model/privileges");
const ModuleModel = require("../model/modules");

const getRol = async (req, res = response) => {
  let mensaje = "";
  try {
    const roles = await RolModel.findAll({
      include: [
        {
          model: PMRModel,
          include: [
            { model: PrivilegiosModel, attributes: ["name"] },
            { model: ModuleModel, attributes: ["name"] },
          ],
        },
      ],
    });
    console.log("buenas noches amigos" + roles);
    mensaje = roles;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneRol = async (req, res = response) => {
  let mensaje = "";
  try {
    const id = req.params.id;
    const roles = await RolModel.findOne({ where: { id: id } });
    mensaje = roles;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postRol = async (req, res = response) => {
  try {
    const { name, stateId, detalleRol } = req.body;

    const newRol = await RolModel.create({
      name,
      stateId,
    });

    const detalleInstance = detalleRol.map((detalle) => ({
      stateId: detalle.stateId,
      privilegeId: detalle.privilegeId,
      moduleId: detalle.moduleId,
      rolesId: newRol.getDataValue("id"),
    }));

    await PMRModel.bulkCreate(detalleInstance);
    res.status(201).json({ newRol, detalleInstance });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const putRol = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;

  try {
    await Rol.update(body, { where: { id } });
    mensaje = "Role modificada con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const deleteRol = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params

  try {
    await RolModel.destroy({ where: { id } });
    mensaje = "Role eliminado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getRol,
  getOneRol,
  postRol,
  putRol,
  deleteRol,
};
