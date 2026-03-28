import express from "express";
import registrationController from "../controller/registrationController.js";
import userExistCheckHandler from "../middleware/userExistCheckHandler.js";

const router = express.Router();
router.post(
  "/userRegistration",
  userExistCheckHandler.userCheck,
  registrationController.userRegistration,
);
router.post(
  "/otpMailSend",
  userExistCheckHandler.emailCheck,
  registrationController.otpSender,
);

router.post("/otpMailReSend", registrationController.otpReSender);
router.post("/otpVerifier", registrationController.otpVerifier);
export default router;
