const { response } = require("express");
const FoodModel = require("../model/foods");
const { upload, updateFile, deleteImage } = require("../helpers/cloudinary");

const getFood = async (req, res = response) => {
  try {
    const foods = await FoodModel.findAll({});
    res.json({ msg: foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneFood = async (req, res = response) => {
  try {
    const id = req.params.id;
    const food = await FoodModel.findOne({
      where: { id },
    });
    res.json({ msg: food });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postFood = async (req, res = response) => {
  let mensaje = "";
  try {
    const { name, description, price, listingPrice, stateId } = req.body;
    let imagenUrl = null;

    if (req.files && req.files.image) {
      const imagenArchivo = req.files.image;
      imagenUrl = await upload(imagenArchivo);
    }

    await FoodModel.create({
      name,
      description,
      price,
      listingPrice,
      type:'foods',
      image: imagenUrl,
      stateId,
    });
    mensaje = "Comida creada con exito";
  } catch (error) {
    mensaje = error.message || "hubo error al procesar solicitud";
  }
  res.json({
    mensaje,
  });
};
const putFood = async (req, res = response) => {
  let mensaje = "";
  
  try {
    const { id } = req.params;
    const { name, description, price, listingPrice, stateId } = req.body;

    if (req.files && req.files.image) {
      const imagenArchivo = req.files.image;
      imagenUrl = await upload(imagenArchivo);
    }

    await FoodModel.update(
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
    mensaje
  })
};

// const deleteFood = async (req, res = response) => {
//   const { id } = req.params;

//   try {
//     const food = await FoodModel.findByPk(id);
//     if (!food) {
//       return res.status(404).json({ msg: "La comida no existe" });
//     }

//     await FoodModel.destroy({ where: { id } });

//     res.json({ msg: "Comida eliminada con éxito" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtén la URL de la imagen actual antes de eliminarla
    const foodFind = await FoodModel.findByPk(id);

    if (!foodFind) {
      return res.status(404).json({ msg: "La comida no existe" });
    }

    await foodFind.destroy({ where: { id } });

    // const oldImageUrl = food.image;

    // Extrae el public_id de la URL de Cloudinary
    // const publicId = extractPublicIdFromUrl(oldImageUrl);

    // Elimina la imagen de Cloudinary
    // await deleteImage(publicId);

    // Actualiza el modelo en la base de datos (aquí debes ajustar según tu modelo)
    // await food.update({ image: null }); // O setea el campo de imagen según tu lógica

    res.json({ msg: "Imagen eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la comida" });
  }
};

// Función para extraer el public_id de una URL de Cloudinary
const extractPublicIdFromUrl = (url) => {
  const urlArr = url.split("/");
  const arr = urlArr[urlArr.length - 1];
  return arr.split(".")[0];
};

module.exports = {
  getFood,
  getOneFood,
  postFood,
  putFood,
  deleteFood,
};
