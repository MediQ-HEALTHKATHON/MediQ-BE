const AuthService = require("./auth.service");
const asyncErrorHandler = require("@errors/asyncErrorHandler");

class AuthController {
  async register(req, res, next) {
    const result = await AuthService.register(req.body);
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: result,
    });
  }

  async login(req, res, next) {
    const result = await AuthService.login(req.body);
    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result,
    });
  }
}

const controller = new AuthController();
module.exports = {
  register: asyncErrorHandler(controller.register.bind(controller)),
  login: asyncErrorHandler(controller.login.bind(controller)),
};
