const express = require("express");
const router = express.Router();
const auth = require("../middleware/is_auth");
const orderController =  require("../controller/order.controller")

router.post("/", auth.verifyUserCart, orderController.addOrder);

router.get("/find/:id", auth.verifyUser, orderController.getOrder);

router.delete("/:id/:orderID", auth.verifyUser, orderController.deleteOrder);

module.exports = router;
