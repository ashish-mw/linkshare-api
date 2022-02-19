const db = require("./db");
const argon2 = require("argon2");

exports.createUser = async (req, res, next) => {
  const body = req.xop.body;

  // check if user is already there with that username
  if (db.findUser({ username: body.username })) {
    return next({
      status: 400,
      message: "Username already taken",
    });
  }

  const password = await argon2.hash(body.password);
  db.insertUser({
    username: body.username,
    password: password,
  });
  return res.sendStatus(201);
};
