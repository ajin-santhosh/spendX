import express from "express";
import userController from "../controller/userController.js";
import userExist from "../middleware/userExistCheckHandler.js";

const router = express.Router();

router.post(
  "/userRegistration",
  userExist.userCheck,
  userController.userRegistration
);

router.post("/login", userController.userLogin);
router.post("/refresh",userController.userRefresh)
router.post("/logout",userController.userLogout)
export default router;