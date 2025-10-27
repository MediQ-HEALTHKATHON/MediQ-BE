const express = require("express");
const app = express();

const routes = require("./routes");
const {
  enableCORS,
  setSecurityHeaders,
} = require("@middlewares/security.middleware");
const errorHandler = require("@middlewares/ErrorHandler.middleware");

app.use(express.json());
app.use(enableCORS);
app.use(setSecurityHeaders);

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to the API" });
});

app.use(errorHandler);

module.exports = app;
