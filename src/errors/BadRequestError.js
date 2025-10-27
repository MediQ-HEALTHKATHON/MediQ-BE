/**
 * Error untuk request yang tidak valid (400 Bad Request).
 * Biasa digunakan untuk validasi input yang gagal.
 */
const HttpError = require("./HttpError");

class BadRequestError extends HttpError {
  constructor(message = "Bad Request - Permintaan tidak valid") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

module.exports = BadRequestError;
