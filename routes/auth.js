const express = require("express");
const router = express.Router();

const userController = require("../controller/authController")

router.use(express.json());

router.post ("/login",userController.logIn);
router.post ("/signUp",userController.signUp);
module.exports = router;

