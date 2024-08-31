const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const authMiddelware = require("../middelware/authMiddelware");

//register router
router.route("/register").post(userController.register);

//login router
router.route("/login").post(userController.login);

//get user data
router.route("/user/data").get(authMiddelware,userController.getUserData);


module.exports = router;