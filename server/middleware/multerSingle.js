const multer = require("multer");

function uploadImage(photo) {
  const storage = multer.diskStorage({
    destination: `../client/./public/images/${photo}`,
    // destination: `./public/images/${photo}`,

    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  return upload;
}

module.exports = uploadImage;
