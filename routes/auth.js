const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.post("/searchuser", userController.searchuser);
router.post("/register", userController.register);
router.post("/edituser", userController.edituser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
module.exports = router;