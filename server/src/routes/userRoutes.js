import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/login", userController.userLogin);
router.post("/refresh", userController.userRefresh);
router.post("/logout", userController.userLogout);
export default router;
