const express = require("express");
const router = express.Router();

const user = require("../Model/UserModel");
const UserController = require("../Controllers/UserController");


// Create Route Paths
router.post("/", UserController.addUsers);

module.exports = router;