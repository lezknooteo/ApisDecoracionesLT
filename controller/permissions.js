const { response } = require("express");

const Permiso = require("../model/privileges");

const getPermiso = async (req, res = response) => {
  let mensaje = "";
  try {
    const permiso = await Permiso.findAll();
    console.log("Permiso" + permiso);
    mensaje = permiso;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOnePermiso = async (req, res = response) => {
  let mensaje = "";
  try {
    const id = req.params.id;
    const permiso = await Permiso.findOne({ where: { id: id } });
    mensaje = permiso;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postPermiso = async (req, res = response) => {
  const body = req.body;
  try {
    await Permiso.create(body);
    mensaje = "Permiso creado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const putPermiso = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;

  try {
    await Permiso.update(body, { where: { id } });
    mensaje = "Permiso modificado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const deletePermiso = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;

  try {
    await Permiso.destroy({ where: { id } });
    mensaje = "Permiso eliminado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getPermiso,
  getOnePermiso,
  postPermiso,
  putPermiso,
  deletePermiso,
};
