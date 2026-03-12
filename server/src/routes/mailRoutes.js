const express = require('express');
const router = express.Router();
const mailController = require("../controller/mailController")
const mailExist = require("../middleware/userExistCheckHandler") 
router.post('/otpMail',mailExist.userCheck,mailController.otpGenerator)

module.exports = router
