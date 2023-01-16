const express = require("express");
const auth = require("../middleware/is_auth");
const userController = require("../controller/user");
const router = express.Router();

router.put("/:id", auth.verifyUser , userController.editUser);

router.delete("/:id", auth.verifyAdmin, userController.deleteUser);

router.get("/find/:id", auth.verifyAdmin, userController.getUser );

router.get("/", auth.verifyAdmin, userController.getAllUsers);

module.exports = router;
