const ForbiddenError = require("@errors/ForbiddenError");

/**
 * Middleware untuk membatasi akses berdasarkan peran pengguna.
 * @param {string[]} allowedRoles - Array berisi string peran yang diizinkan (e.g., ['admin', 'institution'])
 */
const checkRole = (allowedRoles) => {
  if (!Array.isArray(allowedRoles)) {
    throw new Error("allowedRoles harus berupa array!");
  }

  return (req, res, next) => {
    if (!req.userRole) {
      return next(
        new ForbiddenError(
          "Peran pengguna tidak terautentikasi atau tidak ditemukan",
        ),
      );
    }

    const hasAccess = allowedRoles.includes(req.userRole);

    if (!hasAccess) {
      return next(
        new ForbiddenError(
          `Akses ditolak. Peran yang dibutuhkan: ${allowedRoles.join(" atau ")}`,
        ),
      );
    }

    next();
  };
};

module.exports = checkRole;
