const { Router } = require('express');

const route = Router();

const { getServicio } = require('../controller/services');
const { getOneServicio } = require('../controller/services');
const { postServicio } = require('../controller/services');
const { putServicio } = require('../controller/services');
const { deleteServicio } = require('../controller/services');

// const storage = multer.diskStorage({
//   destination: "./public/images",
//   filename: function (_req, file, cb) {
//     const extension = file.originalname.slice(file.originalname.lastIndexOf("."));
//     cb(null, Date.now() + extension);
//   },
// });

// const upload = multer({ storage: storage });

route.get('/', getServicio);
route.get('/:id', getOneServicio);
route.post('/', postServicio);
route.put('/:id', putServicio);
route.delete('/:id', deleteServicio);

module.exports = route;
