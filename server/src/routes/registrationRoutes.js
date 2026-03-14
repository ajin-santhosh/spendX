const express = require("express");
const router = express.Router();
const registrationController = require("../controller/registrationController");
const mailExist = require("../middleware/userExistCheckHandler");
router.post(
  "/otpMailSend",
  mailExist.userCheck,
  registrationController.otpSender,
);
router.post("/otpMailReSend", registrationController.otpReSender);

module.exports = router;
