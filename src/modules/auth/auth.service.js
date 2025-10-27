const { User } = require("@models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("@config/config");
const BadRequestError = require("@errors/BadRequestError");
const NotFoundError = require("@errors/NotFoundError");
const UnauthorizedError = require("@errors/UnauthorizedError");

const SALT_ROUNDS = 10;

class AuthService {
  async register({ name, email, password, role }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestError("Email sudah terdaftar");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const userJson = newUser.toJSON();
    delete userJson.password;
    return userJson;
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError("Email tidak ditemukan");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Password salah");
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: "1d",
    });

    const userJson = user.toJSON();
    delete userJson.password;

    return { user: userJson, token };
  }
}

module.exports = new AuthService();
