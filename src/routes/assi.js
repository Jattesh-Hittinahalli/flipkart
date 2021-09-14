const express = require("express");
var multer = require("multer");
const router = express.Router();
const { createBook, updateBook, getBook, deleteBook } = require("../controller/assi");
var path = require('path');
const pa = path.join(__dirname, "uploads")

console.log(pa)
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, files, cb) => {
        cb(null, "img" + Date.now() + files.originalname);
    },
    pathName: (req, files, cb) => {
        cb(null, pa + files.originalname);
    }
});
var upload = multer({ storage: storage });

router.post(
    "/createBook",
    upload.single("productimage", 10),
    createBook
);

router.put(
    "/updateBook",
    upload.single("productimage", 10),
    updateBook
);

router.get("/getBooks", getBook);

router.delete("/deleteBooks", deleteBook);
module.exports = router;