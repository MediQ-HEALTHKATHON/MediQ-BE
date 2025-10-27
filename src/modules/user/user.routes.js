const express = require("express");
const UserController = require("./user.controller");
const router = express.Router();
const {
  createUserValidator,
  updateUserValidator,
  idParamValidator,
} = require("./user.validator");
const validateRequest = require("@middlewares/validation.middleware");
const authJWT = require("@middlewares/auth.middleware");
const checkRole = require("@middlewares/role.middleware");

router.use(authJWT);

router.get("/", checkRole(["admin"]), UserController.getAll);

router.post(
  "/",
  checkRole(["admin"]),
  createUserValidator,
  validateRequest,
  UserController.create,
);

router.get("/:id", idParamValidator, validateRequest, UserController.getById);

router.put(
  "/:id",
  idParamValidator,
  updateUserValidator,
  validateRequest,
  UserController.update,
);

router.delete(
  "/:id",
  idParamValidator,
  validateRequest,
  checkRole(["admin"]),
  UserController.delete,
);

module.exports = router;
