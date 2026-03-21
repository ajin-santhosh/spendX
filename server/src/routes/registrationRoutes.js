import express from "express";
import registrationController from "../controller/registrationController.js";
import mailExist from "../middleware/userExistCheckHandler.js";

const router = express.Router();

router.post(
  "/otpMailSend",
  mailExist.emailCheck,
  registrationController.otpSender
);

router.post("/otpMailReSend", registrationController.otpReSender);

export default router;