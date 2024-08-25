const express = require("express");
const router = express.Router();

const user = require("../Model/UserModel");
const UserController = require("../Controllers/UserController");
const RegUser = require("../Model/UserRegister");



// Create Route Paths
router.post("/", UserController.addUsers);
router.get("/", UserController.viewUsers);
router.get("/", UserController.viewRegUsers);

module.exports = router;