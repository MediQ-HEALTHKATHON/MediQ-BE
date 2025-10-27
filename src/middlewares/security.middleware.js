const cors = require("cors");
const helmet = require("helmet");

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const enableCORS = cors(corsOptions);
const setSecurityHeaders = (req, res, next) => {
  helmet();
  next();
};

module.exports = { enableCORS, setSecurityHeaders };
