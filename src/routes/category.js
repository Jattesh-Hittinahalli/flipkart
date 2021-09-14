const express = require("express");
const { create_category, get_category } = require("../controller/category");
const { requiredsignin, verifyadmin } = require("../common-middleware/index");
const router = express.Router();

router.post("/category/create", requiredsignin, verifyadmin, create_category);
router.get("/getcategory", get_category);

module.exports = router;
