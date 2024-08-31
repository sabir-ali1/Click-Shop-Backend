const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");
const authMiddelware = require("../middelware/authMiddelware");


//add to cart
router.route("/add").post(authMiddelware,cartController.addToCart);

//get cart item
router.route("/get").get(authMiddelware,cartController.getCart);

//delter cart item
router.route("/remove/:productId").delete(authMiddelware,cartController.removeProduct);

//decrease qty
router.route("/--qty").post(authMiddelware,cartController.decreaseQty);

//delete all product from cart
router.route("/clear").delete(authMiddelware,cartController.deleteAllProductFromCart);


module.exports = router;