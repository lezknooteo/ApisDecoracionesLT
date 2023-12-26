const { response } = require("express");

const Decoraciones = require("../model/decorations");
const { upload, updateFile } = require("../helpers/cloudinary");

const getDecoraciones = async (req, res = response) => {
  let mensaje = "";
  try {
    const decoraciones = await Decoraciones.findAll();
    console.log("Decoracion" + decoraciones);
    mensaje = decoraciones;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneDecoraciones = async (req, res = response) => {
  let mensaje = "";
  try {
    const id = req.params.id;
    const decoraciones = await Decoraciones.findOne({ where: { id: id } });
    mensaje = decoraciones;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postDecoraciones = async (req, res = response) => {
  let mensaje = "";
  try {
    const { name, description, price, listingPrice, stateId, categoryId } = req.body;
    let imagenUrl = null;

    if (req.files && req.files.image) {
      const imagenArchivo = req.files.image;
      imagenUrl = await upload(imagenArchivo);
    }

    await Decoraciones.create({
      name,
      description,
      price,
      listingPrice,
      type: "decoration",
      stateId,
      categoryId,
      image: imagenUrl,
    });

    mensaje = "Decoración creado con exito";

  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }
  res.json({
    mensaje,
  });
};

const putDecoraciones = async (req, res = response) => {
  let mensaje = "";

  const { name, description, price, listingPrice, stateId } = req.body;
  const { id } = req.params;

  if (req.files && req.files.image) {
    const imagenArchivo = req.files.image;
    imagenUrl = await upload(imagenArchivo);
  }

  try {
    await Decoraciones.update(
      {
        name,
        description,
        price,
        listingPrice,
        stateId,
        image: imagenUrl,
      },
      { where: { id } }
    );
    mensaje = "Decoración modificada con exito";
  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }
  res.json({
    mensaje,
  });
};

const deleteDecoraciones = async (req, res = response) => {
  try {
    const { id } = req.params;

    const decorationFind = await Decoraciones.findByPk(id);

    if (!decorationFind) {
      return res.status(404).json({ msg: "La decoración no existe" });
    }
    
    await Decoraciones.destroy({ where: { id } });
    mensaje = "Decoración eliminada con exito";

    res.json({
      mensaje,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la decoración" });
  }
};

module.exports = {
  getDecoraciones,
  getOneDecoraciones,
  postDecoraciones,
  putDecoraciones,
  deleteDecoraciones,
};
