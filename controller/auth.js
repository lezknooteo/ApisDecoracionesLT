const Users = require("../model/user");
const Status = require("../model/status");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");
const jwt = require("jsonwebtoken");

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

const login = async (req, res) => {
  const { name, password } = req.body;

  //Verificar si el email existe
  const usuarios = await Users.findOne({
    where: { name },
    include: [
      {
        model: Status,
        attributes: ["name"],
      },
    ],
  });

  try {
    if (!usuarios) {
      //Si encontró el email
      return res.status(400).json({
        msg: "Correo electrónico no encontrado",
      });
    }

    if (usuarios.Status.name != "Activo") {
      return res.status(400).json({
        msg: "Usuario Activo",
      });
    }

    resultado = await comparePassword(password, usuarios.password);

    if (resultado) {
      const token = await generarJWT(usuarios);
      res.cookie("token", token); //creando la cookie
      return res.status(200).json({
        //usuarios,
        token,
      });
    } else {
      return res.status(400).json({
        msg: "La contraseña o el correo es incorrecto",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: "Apreciado usuario contacte al administrador.",
    });
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({ error: "Por favor logueese." });
    }
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    // console.log('verify:'+verify)
    if (!verify) {
      res.json({ error: "Unauthorized" });
      return;
    }

    req.user = await Users.findOne({ id: verify.uid.id });
    next();
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = {
  login,
  isAuthenticated,
};
