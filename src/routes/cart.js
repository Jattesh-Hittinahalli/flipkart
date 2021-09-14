const express = require("express");
const router = express.Router();
const { requiredsignin } = require("../common-middleware/index");
const { addtocart } = require("../controller/cart");

router.post("/add/cart", requiredsignin, addtocart);

module.exports = router;
