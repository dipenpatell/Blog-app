const express = require("express");
const router = express.Router();
// const invoiceModel = require("../models/invoice-model");
const { registerUser, loginUser } = require("../controller/authController");
const isAuth = require("../middleware/isAuth");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
