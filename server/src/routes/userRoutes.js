const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userExist = require("../middleware/userExistCheckHandler");
router.post(
  "/userRegistration",
  userExist.userCheck,
  userController.userRegistration,
);
router.post("/login",  userController.userLogin);

module.exports = router;
