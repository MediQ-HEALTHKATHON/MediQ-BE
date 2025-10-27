/**
 * Class dasar untuk error HTTP kustom.
 * Menyimpan pesan error dan status code HTTP.
 */
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpError;
