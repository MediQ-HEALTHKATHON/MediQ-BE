/**
 * Error ketika user mencoba mengakses resource tanpa autentikasi yang valid (401 Unauthorized).
 * Biasanya terkait token JWT yang hilang, salah, atau kedaluwarsa.
 */
const HttpError = require("./HttpError");

class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized - Autentikasi diperlukan atau gagal") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

module.exports = UnauthorizedError;
