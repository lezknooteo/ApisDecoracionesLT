const { response } = require("express");
const bcrypt = require("bcrypt"); // Import the bcrypt library
const User = require("../model/user");
let mensaje = "";

const getUser = async (req, res = response) => {
  let mensaje = "";
  try {
    const user = await User.findAll();
    console.log("buenas noches amigos" + user);
    mensaje = user;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const getOneUser = async (req, res = response) => {
  let mensaje = "";
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    mensaje = user;
  } catch (error) {
    mensaje = error;
  }
  res.json({
    msg: mensaje,
  });
};

const postUser = async (req, res = response) => {
  const body = req.body;
  let mensaje = "";

  try {
    const newUser = User.build(body); // Create the user object
    newUser.password = bcrypt.hashSync(body.password, 10); // Hash the password
    await newUser.save(); // Save the new user to the database
    mensaje = "Usuario registrado exitosamente";
  } catch (error) {
    mensaje = error.message; // Access the error message
  }

  res.json({
    mensaje,
  });
};

const putUser = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;
  try {
    await User.update(body, { where: { id } });
    mensaje = "Usuario modificado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

const deleteUser = async (req, res = response) => {
  const body = req.body;
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    mensaje = "usuario eliminado con exito";
  } catch (error) {
    mensaje = error;
  }
  res.json({
    mensaje,
  });
};

module.exports = {
  getUser,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
};
