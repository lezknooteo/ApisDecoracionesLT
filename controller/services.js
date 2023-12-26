const { response } = require("express");

const Servicio = require("../model/services");

const { upload, updateFile } = require("../helpers/cloudinary");

const getServicio = async (req, res = response) => {
  let mensaje = "";
  try {
    const servicio = await Servicio.findAll();
    console.log("Servicio" + servicio);
    mensaje = servicio;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneServicio = async (req, res = response) => {
  let mensaje = "";
  try {
    const id = req.params.id;
    const servicio = await Servicio.findOne({ where: { id: id } });
    mensaje = servicio;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postServicio = async (req, res) => {
  let mensaje;
  
  try {
    const { name, description, price, listingPrice, stateId } = req.body;
    let imagenUrl = null;

    if (req.files && req.files.image) {
      const imagenArchivo = req.files.image;
      imagenUrl = await upload(imagenArchivo);
    }

    await Servicio.create({
      name,
      description,
      price,
      listingPrice,
      type:'services',
      stateId,
      image: imagenUrl,
    });

    mensaje = "Servicio creado con éxito";
  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }

  res.json({
    mensaje,
  });
};

const putServicio = async (req, res = response) => {
  const { id } = req.params;
  const { name, description, price, listingPrice, stateId } = req.body;
  
  if (req.files && req.files.image) {
    const imagenArchivo = req.files.image;
    imagenUrl = await upload(imagenArchivo);
  }

  try {

    await Servicio.update(
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
    mensaje = "Servicio modificado con exito";
  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }
  res.json({
    mensaje,
  });
};

const deleteServicio = async (req, res = response) => {
  const { id } = req.params;
  const serviceFind = await Servicio.findByPk(id);

  if (!serviceFind) {
    return res.status(404).json({ msg: "el servicio no existe" });
  }

  try {
    await Servicio.destroy({ where: { id: id } });
    mensaje = "Servicio eliminado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getServicio,
  getOneServicio,
  postServicio,
  putServicio,
  deleteServicio,
};
