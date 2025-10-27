const { User } = require("@models");
const NotFoundError = require("@errors/NotFoundError");
const BadRequestError = require("@errors/BadRequestError");
const ForbiddenError = require("@errors/ForbiddenError");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

class UserService {
  async getAll() {
    return await User.findAll({ attributes: { exclude: ["password"] } });
  }

  async getById(requestingUserId, requestingUserRole, targetUserId) {
    const targetIdInt = parseInt(targetUserId, 10);
    if (isNaN(targetIdInt)) {
      throw new BadRequestError("ID User tidak valid");
    }

    if (requestingUserRole !== "admin" && requestingUserId !== targetIdInt) {
      throw new ForbiddenError(
        "Anda tidak punya izin untuk melihat detail user ini.",
      );
    }

    const user = await User.findByPk(targetIdInt, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new NotFoundError("User tidak ditemukan");
    }
    return user;
  }

  async create(data) {
    const { name, email, password } = data;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestError("Email sudah terdaftar");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const userJson = newUser.toJSON();
    delete userJson.password;
    return userJson;
  }

  async update(requestingUserId, requestingUserRole, targetUserId, data) {
    const targetIdInt = parseInt(targetUserId, 10);
    if (isNaN(targetIdInt)) {
      throw new BadRequestError("ID User tidak valid");
    }

    if (requestingUserRole !== "admin" && requestingUserId !== targetIdInt) {
      throw new ForbiddenError(
        "Anda tidak punya izin untuk mengupdate user ini.",
      );
    }

    const user = await User.findByPk(targetIdInt);
    if (!user) {
      throw new NotFoundError("User yang akan diupdate tidak ditemukan");
    }

    if (data.email && data.email !== user.email) {
      const existingEmail = await User.findOne({
        where: { email: data.email },
      });
      if (existingEmail && existingEmail.id !== targetIdInt) {
        throw new BadRequestError("Email sudah digunakan user lain");
      }
    }

    if (data.password && data.password.trim() !== "") {
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    } else {
      delete data.password;
    }

    await user.update(data);
    const updatedUserJson = user.toJSON();
    delete updatedUserJson.password;
    return updatedUserJson;
  }

  async delete(requestingUserRole, targetUserId) {
    const targetIdInt = parseInt(targetUserId, 10);
    if (isNaN(targetIdInt)) {
      throw new BadRequestError("ID User tidak valid");
    }

    const user = await User.findByPk(targetIdInt);
    if (!user) {
      throw new NotFoundError("User yang akan dihapus tidak ditemukan");
    }
    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
