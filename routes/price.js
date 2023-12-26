const { Router } = require("express");
const Validacion = require("../middleware/price");

const route = Router();

const { getPrice } = require("../controller/price");
const { postPrice } = require("../controller/price");
const { putPrice } = require("../controller/price");
const { deletePrice } = require("../controller/price");

route.get("/", getPrice);
route.post("/", postPrice);
route.put("/:id", putPrice);
route.delete("/:id", deletePrice);

module.exports = route;
