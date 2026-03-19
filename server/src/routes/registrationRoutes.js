const express = require("express");
const router = express.Router();
const registrationController = require("../controller/registrationController");
const mailExist = require("../middleware/userExistCheckHandler");
router.post(
  "/otpMailSend",
  mailExist.emailCheck,
  registrationController.otpSender,
);
router.post("/otpMailReSend", registrationController.otpReSender);

module.exports = router;
