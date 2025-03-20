const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     return cb(null, "./public/Images");
//   },
//   filename: function (req, res, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
const storage = multer.memoryStorage();
module.exports.upload = multer({ storage: storage });
