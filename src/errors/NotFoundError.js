/**
 * Error ketika resource yang diminta tidak ditemukan (404 Not Found).
 */
const HttpError = require("./HttpError");

class NotFoundError extends HttpError {
  constructor(message = "Not Found - Sumber daya tidak ditemukan") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
