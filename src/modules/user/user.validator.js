const { body, param } = require("express-validator");

const createUserValidator = [
  body("name").notEmpty().withMessage("Nama wajib diisi"),
  body("email").notEmpty().isEmail().withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
];

const updateUserValidator = [
  param("id").isInt().withMessage("ID user tidak valid"),
  body("name").optional().notEmpty().withMessage("Nama tidak boleh kosong"),
  body("email").optional().isEmail().withMessage("Email tidak valid"),
];

const idParamValidator = [
  param("id").isInt().withMessage("ID user harus berupa angka"),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  idParamValidator,
};
