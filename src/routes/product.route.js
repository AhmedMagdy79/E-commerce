const express = require("express");
const auth = require("../middleware/is_auth");
const productController = require("../controller/product.controller");
const router = express.Router();

router.post("/", auth.verifyAdmin, productController.createProduct);

router.put("/:id", auth.verifyAdmin, productController.updateProduct);

router.delete("/:id", auth.verifyAdmin, productController.deleteProduct);

router.get("/find/:id", productController.getProduct);

router.get("/", productController.getAllProducts);

module.exports = router;
