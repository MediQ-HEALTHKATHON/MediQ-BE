/**
 * Error ketika user terautentikasi tetapi tidak memiliki izin (role)
 * untuk mengakses resource tersebut (403 Forbidden).
 */
const HttpError = require("./HttpError");

class ForbiddenError extends HttpError {
  constructor(message = "Forbidden - Akses ditolak") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

module.exports = ForbiddenError;
