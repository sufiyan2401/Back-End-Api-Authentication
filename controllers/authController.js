const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { sendResponse } = require("../helper/helper");
const jwt = require("jsonwebtoken");
const route = express.Router();

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const obj = { email, password };

    userModel
      .findOne({ email })
      .then(async (user) => {
        let isConfirm = await bcrypt.compare(obj.password, user.password);
        if (isConfirm) {
          res.send(sendResponse(true, user, "Login Successfully"));
        } else {
          res.send(sendResponse(false, null, "Credential Error"));
        }
      })
      .catch((err) => {
        res.send(sendResponse(false, err, "User Doesn't Exist"));
      });

    // let { email, password } = req.body;
    // let obj = { email, password };

    // let checking = userModel
    //   .findOne({ email })
    //   .then(async (result) => {
    //     let comparing = await bcrypt.compare(obj.password, result.password);
    //     if (comparing) {
    //       let token = jwt.sign({ ...result }, process.env.SECURE);
    //       res.send(
    //         sendResponse(true, { user: result, token }, "Login Successfully")
    //       );
    //     } else {
    //       res.send(sendResponse(false, null, "Internal Error")).status(400);
    //     }
    //   })
    //   .catch((e) => {
    //     res.send(sendResponse(false, null, "error", e)).status(400);
    //   });
  },
  signup: async (req, res) => {
    let { userName, email, password } = req.body;
    let obj = { userName, email, password };
    let requiredField = ["userName", "email", "password"];
    let errArr = [];

    requiredField.forEach((x) => {
      if (!obj[x]) {
        errArr.push(x);
      }
    });

    if (errArr.length > 0) {
      res
        .send(sendResponse(false, null, "Please fill All fields", errArr))
        .status(400);
    } else {
      let hashPassword = await bcrypt.hash(obj.password, 10);
      obj.password = hashPassword;

      let checkemail = await userModel.findOne({ email });
      if (checkemail) {
        res
          .send(sendResponse(false, null, "This email already exist"))
          .status(403);
      } else {
        userModel
          .create(obj)
          .then((result) => {
            res
              .send(sendResponse(true, result, "Successfully Sigup"))
              .status(200);
          })
          .catch((e) => {
            res.send(sendResponse(false, null, "Internal server Error", e));
          });
      }
    }
  },
  getUser: async (req, res) => {
    let result = await userModel.find();
    if (result) {
      res.send(sendResponse(true, result)).status(200);
    } else {
      res.send(sendResponse(false, null, "Data not found")).status(404);
    }
  },
  protect: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];

      jwt.verify(token, process.env.SECURE, (err, decoded) => {
        if (err) {
          res.send(sendResponse(false, null, "Unauthorized")).status(403);
        } else {
          next();
        }
      });
    } else {
      res.send(sendResponse(false, null, "Unauthorized")).status(403);
    }
  },
  adminProtected: async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
      if (err) {
        res.send(sendResponse(false, null, "Unauthorized")).status(403);
      } else {
        if (decoded._doc.isAdmin) {
          next();
        } else {
          res
            .send(sendResponse(false, null, "You Have Rights for this Action"))
            .status(403);
        }
      }
    });
  },
};

module.exports = AuthController;
