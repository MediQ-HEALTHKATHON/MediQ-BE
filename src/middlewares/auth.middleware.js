const jwt = require("jsonwebtoken");
const config = require("@config/config");
const UnauthorizedError = require("@errors/UnauthorizedError");

function authJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new UnauthorizedError("Token tidak ditemukan atau format salah"),
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Token kedaluwarsa"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Token tidak valid"));
    }
    return next(new UnauthorizedError("Gagal memverifikasi token"));
  }
}

module.exports = authJWT;
