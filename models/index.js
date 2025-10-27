"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

const env = process.env.NODE_ENV || "development";

const configPath = path.resolve(__dirname, "..", "config", "config.json");
if (!fs.existsSync(configPath)) {
  throw new Error(`File konfigurasi tidak ditemukan di: ${configPath}`);
}
const config = require(configPath)[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const modulesDir = path.join(__dirname, "..", "src", "modules");
fs.readdirSync(modulesDir)
  .filter((folder) => {
    return fs.statSync(path.join(modulesDir, folder)).isDirectory();
  })
  .forEach((folder) => {
    const modulePath = path.join(modulesDir, folder);
    fs.readdirSync(modulePath)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 && file.slice(-9) === ".model.js"
        );
      })
      .forEach((file) => {
        const model = require(path.join(modulePath, file))(
          sequelize,
          Sequelize.DataTypes,
        );
        db[model.name] = model;
      });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
