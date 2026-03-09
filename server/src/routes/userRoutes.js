const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")

router.post('/userRegistration',userController.userRegistration)

module.exports = router