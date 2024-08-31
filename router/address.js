const express = require("express");
const router = express.Router();
const addressController = require("../controller/address");
const authMiddelware = require("../middelware/authMiddelware");


//add address router
router.route("/add").post(authMiddelware,addressController.addAddress);


//get address router
router.route("/get").get(authMiddelware,addressController.getAddress);


module.exports = router;