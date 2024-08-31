const express = require("express");
const router = express.Router();
const productController = require("../controller/product");


//add product router
router.route("/add").post(productController.addProduct);

//all product router
router.route("/all").get(productController.getAllProduct);

//get single product
router.route("/:id").get(productController.getSingleProduct);



module.exports = router;