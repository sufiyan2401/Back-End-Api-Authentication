const express = require("express");
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel");
const { sendResponse } = require("../helper/helper");
const AuthController = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const route = express.Router();

route.post("/signup", AuthController.signup)
route.post("/login", AuthController.login )
route.get("/", AuthController.getUser)
route.delete("/:id", (req, res) => {})
route.put("/:id", (req, res) => {})
route.get("/test", AuthController.protect, (req, res) => {
    res.send("User is Valid");
});

module.exports = route

// {
//       "email": "xyz@gmail.com",
    //   "password":"12345"
// }