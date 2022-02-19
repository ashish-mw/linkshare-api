const db = require("./db");
const argon2 = require("argon2");

const utils = require("./utils");

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

exports.createSession = async (req, res, next) => {
  const body = req.xop.body;
  const user = db.findUser({ username: body.username });
  if (!user) {
    return next({
      status: 404,
      message: "User not found",
    });
  }

  const passwordOK = await argon2.verify(user.password, body.password);
  if (!passwordOK) {
    return next({
      status: 400,
      message: "Password is incorrect",
    });
  }

  const accessToken = utils.signJWT({
    username: user.username,
    id: user.id,
  });

  return res.json({
    accessToken,
  });
};

exports.getUser = (req, res, next) => {
  return res.json({
    username: res.locals.user.username,
    id: res.locals.user.id,
  });
};

exports.createShare = (req, res, next) => {
  let body = req.xop.body;
  const payload = {
    user: res.locals.user.id,
    ...body,
  };

  db.createShare(payload);
  return res.sendStatus(201);
};

exports.getUserShares = (req, res, next) => {
  const shares = db.getUserShares({
    user: res.locals.user.id,
  });
  return res.json({
    shares,
  });
};

exports.updateShare = (req, res, next) => {
  let body = req.xop.body;
  let params = req.xop.params;
  const payload = {
    updated_at: utils.nowForSQL(),
    title: body.title,
    user: res.locals.user.id,
    id: params.id,
  };
  db.updateShare(payload);
  return res.sendStatus(200);
};
