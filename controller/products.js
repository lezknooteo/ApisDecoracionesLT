const { response } = require("express");

const Producto = require("../model/products");
const { upload, updateFile } = require("../helpers/cloudinary");

const getProducts = async (req, res = response) => {
  let mensaje = "";
  try {
    const producto = await Producto.findAll();
    console.log("buenas noches amigos" + producto);
    mensaje = producto;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneProducts = async (req, res = response) => {
  let mensaje = "";
  try {
    const id = req.params.id;
    const producto = await Producto.findOne({ where: { id: id } });
    mensaje = producto;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postProducts = async (req, res = response) => {
  let mensaje = "";
  
  const { name, description, price, listingPrice, count, stateId, categoryId } = req.body;
  let imagenUrl = null;
  
  if (req.files && req.files.image) {
    const imagenArchivo = req.files.image;
    imagenUrl = await upload(imagenArchivo);
  }
  try {
    await Producto.create({
      name,
      description,
      price,
      listingPrice,
      type:'products',
      count,
      stateId,
      categoryId,
      image: imagenUrl,
    });
    mensaje = "producto creado con exito";
  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }
  res.json({
    mensaje,
  });
};

const putProducts = async (req, res = response) => {
  let mensaje=""
  const { name, description, price, listingPrice, stateId } = req.body;
  const {id}= req.params

  if (req.files && req.files.image) {
    const imagenArchivo = req.files.image;
    imagenUrl = await upload(imagenArchivo);
  }

  try {
    await Producto.update(
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
    mensaje = "producto modificado con exito";
  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }
  res.json({
    mensaje,
  });
};

const deleteProducts = async (req, res = response) => {
  const { id } = req.params;
  const productFind = await Producto.findByPk(id);

  if (!productFind) {
    return res.status(404).json({ msg: "El producto no existe" });
  }
  try {
    await Producto.destroy({ where: { id } });
    mensaje = "producto eliminado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getProducts,
  getOneProducts,
  postProducts,
  putProducts,
  deleteProducts,
};
