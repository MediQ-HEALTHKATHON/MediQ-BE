const express = require("express");
const router = express.Router();

const AuthController = require("./auth.controller");
const { registerValidator, loginValidator } = require("./auth.validator");
const validateRequest = require("@middlewares/validation.middleware");

router.post(
  "/register",
  registerValidator,
  validateRequest,
  AuthController.register,
);

router.post("/login", loginValidator, validateRequest, AuthController.login);

module.exports = router;
