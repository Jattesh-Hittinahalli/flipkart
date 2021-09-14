const express = require("express");
var multer = require("multer");
const router = express.Router();
const { createproduct } = require("../controller/products");
const { requiredsignin, verifyadmin } = require("../common-middleware/index");

//const upload = multer({ dest: "uploads/" });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, files, cb) => {
    cb(null, "image-" + Date.now() + "." + files.originalname);
  }
});
var upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.array("productimage", 10),
  requiredsignin,
  verifyadmin,
  createproduct
);

module.exports = router;
