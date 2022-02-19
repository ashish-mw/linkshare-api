const jwt = require("jsonwebtoken");
const config = require("./config");

exports.signJWT = (payload) => {
  return jwt.sign(payload, config.jwtSecret);
};
