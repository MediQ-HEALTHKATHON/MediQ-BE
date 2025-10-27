const UserService = require("./user.service");
const asyncErrorHandler = require("@errors/asyncErrorHandler");

class UserController {
  async getAll(req, res, next) {
    const users = await UserService.getAll();
    res.json({ success: true, message: "Daftar user", data: users });
  }

  async getById(req, res, next) {
    const user = await UserService.getById(req.params.id);
    res.json({ success: true, message: "Detail user", data: user });
  }

  async create(req, res, next) {
    const newUser = await UserService.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "User berhasil dibuat", data: newUser });
  }

  async update(req, res, next) {
    const updatedUser = await UserService.update(req.params.id, req.body);
    res.json({
      success: true,
      message: "User berhasil diperbarui",
      data: updatedUser,
    });
  }

  async delete(req, res, next) {
    await UserService.delete(req.params.id);
    res.json({ success: true, message: "User berhasil dihapus" });
  }
}

// Wrap methods
const controller = new UserController();
module.exports = {
  getAll: asyncErrorHandler(controller.getAll.bind(controller)),
  getById: asyncErrorHandler(controller.getById.bind(controller)),
  create: asyncErrorHandler(controller.create.bind(controller)),
  update: asyncErrorHandler(controller.update.bind(controller)),
  delete: asyncErrorHandler(controller.delete.bind(controller)),
};
