import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/login", userController.userLogin);
router.post("/refresh", userController.userRefresh);
router.post("/logout", userController.userLogout);
router.post("/forgot-password", userController.forgetPassword);
router.post("/verify-temp-password", userController.verifyTempPassword);
router.post("/set-new-password", userController.setNewPassword);

export default router;
