const express = require("express");
const auth = require("../middleware/is_auth");
const cartController = require("../controller/cart");
const router = express.Router();

//add Product to cart
router.post("/", auth.verifyUserCart, cartController.addProductToCart);

//delete product from cart
router.delete("/", auth.verifyUserCart, cartController.deleteProductFromCart);

//clear Cart
router.delete(
    "/clear",
    auth.verifyUserCart,
    cartController.clearProductsFromCart
);

//get cart products
router.get("/:id", auth.verifyUser, cartController.getCartProducts);


module.exports = router;
