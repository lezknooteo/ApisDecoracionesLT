const { response } = require("express");
const Category = require("../model/category");
const { upload, updateFile } = require("../helpers/cloudinary");

const getCategory = async (req, res = response) => {
  let mensaje = "";

  try {
    const category = await Category.findAll({});

    mensaje = category;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneCategory = async (req, res = response) => {
  let mensaje = "";

  try {
    const id = req.params.id;

    const category = await Category.findOne({ where: { id: id } });

    mensaje = category;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postCategory = async (req, res = response) => {
  let mensaje = "";

  try {
    const { name, description, stateId } = req.body;
    const imagenArchivo = req.files.image;
    const imagenUrl = await upload(imagenArchivo);

    await Category.create({
      name,
      description,
      stateId,
      image: imagenUrl,
    });

    mensaje = "categoria creado con exito";
  } catch (error) {
    mensaje = "Error al crear la categoria";
  }
  res.json({
    mensaje,
  });
};

const putCategory = async (req, res = response) => {
  let mensaje = "";

  try {
    const { id } = req.params;
    const { name, description, stateId } = req.body;
    const imagenArchivo = req.files.image;
    const imagenUrl = await upload(imagenArchivo);

    await Category.update(
      {
        name,
        description,
        stateId,
        image: imagenUrl,
      },
      { where: { id } }
    );

    mensaje = "Categoria modificada con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  try {
    await Category.destroy({ where: { id } });

    mensaje = "CAtegoria eliminada con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getCategory,
  getOneCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
