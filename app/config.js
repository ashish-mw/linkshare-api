require("dotenv").config();

module.exports = {
  db: process.env.DB || "linkshare.db",
  port: process.env.PORT || 1234,
  jwtSecret: process.env.JWT_SECRET || "You will be hacked. Please set this!",
};
