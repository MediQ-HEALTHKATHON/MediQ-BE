const express = require("express");
const NotFoundError = require("@errors/NotFoundError");
const router = express.Router();

const authRoutes = require("@modules/auth/auth.routes");
const userRoutes = require("@modules/user/user.routes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
