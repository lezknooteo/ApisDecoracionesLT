const multer = require("multer");

function uploadFile() {
  const storage = multer.diskStorage({
    destination: ".public/images",
    filename: function (_req, file, cb) {
      var extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      cb(null, Date.now() + extension);
    },
  });

  const upload = multer({ storage: storage }).single("file"); //nombre del campo del formulario
  return upload;
}

module.exports = uploadFile;
