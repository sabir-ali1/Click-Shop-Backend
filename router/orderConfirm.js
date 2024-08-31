const express = require("express");
const router = express.Router();
const orderConfirmController = require("../controller/orderConfirm");
const authMiddelware = require("../middelware/authMiddelware");


//add order confirm
router.route("/add").post(authMiddelware,orderConfirmController.addOrderConfirm);


module.exports = router;