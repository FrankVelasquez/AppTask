const express = require("express");
const router = express.Router();

const { UUID } = process.env;
const jwt = require("jsonwebtoken");
const JsonWebTokenError = require("jsonwebtoken/lib/JsonWebTokenError");

const User = require("../models/Usermodel");

//**************************************************************** */
//ruta para registrarse
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  user.password = await user.encryptPass(user.password);
  await user.save();

  const token = jwt.sign({ id: user._id }, UUID, {
    expiresIn: 60 * 2 * 1,
  });
  res.json({ auth: true, token });
});

//**************************************************************** */

//ruta para ingresar a la app
router.post("/signin", async (req, res) => {
  //verificar acceso
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      auth: false,
      message: "Email no encontrado",
    });
  }

  const ValidatePass = await user.validatePass(password);

  if (!ValidatePass) {
    return res.status(401).json({
      auth: false,
      message: "El password no coincide",
    });
  }

  const token = jwt.sign({ id: user._id }, UUID, {
    expiresIn: 60 * 2 * 1,
  });

  res.json({ auth: true, token });
});

//**************************************************************** */
//esta ruta para que el usuario pueda solicitar informacion al api rest
router.get("/protected", async (req, res) => {
  //verificar acceso
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No existe un token",
    });
  }

  const decoded = jwt.verify(token, UUID);

  const user = await User.findById(decoded.id, { password: 0 });
  if (!user) {
    return res.status(404).json({
      auth: false,
      message: "Usuario no encontrado",
    });
  }
  res.json(user);
});

module.exports = router;
