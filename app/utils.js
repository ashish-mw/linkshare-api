const jwt = require("jsonwebtoken");
const config = require("./config");

exports.signJWT = (payload) => {
  return jwt.sign(payload, config.jwtSecret);
};

exports.verifyJWT = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

exports.nowForSQL = () =>
  new Date().toISOString().slice(0, 19).replace("T", " ");
