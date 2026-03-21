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

export default router;