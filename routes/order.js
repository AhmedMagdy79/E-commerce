const express = require("express");
const router = express.Router();
const auth = require("../middleware/is_auth");
const orderController =  require("../controller/order")

router.post("/:id", auth.verifyUser,  )

module.exports = router;
