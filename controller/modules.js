const { response } = require("express");

const Module = require("../model/modules");

const getModule = async (req, res = response) => {
  let mensaje = "";
  try {
    const module = await Module.findAll();
    console.log("Module" + module);
    mensaje = module;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneModule = async (req, res = response) => {
  let mensaje = "";
  try {
    const {id} = req.params;
    const module = await Module.findOne({ where: { id } });
    mensaje = module;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postModule = async (req, res = response) => {
  const body = req.body;
  try {
    await Module.create(body);
    mensaje = "Module creado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const putModule = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params

  try {
    await Module.update(body, { where: { id } });
    mensaje = "Module modificado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const deleteModule = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params

  try {
    await Module.destroy({ where: { id } });
    mensaje = "Module eliminado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getModule,
  getOneModule,
  postModule,
  putModule,
  deleteModule,
};
