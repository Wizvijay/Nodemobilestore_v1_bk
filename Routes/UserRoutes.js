const express = require('express');
const router = express.Router();
const UserController = require("../Controller/UserController");

router.post("/user/register", UserController.registerUser);

module.exports = router;