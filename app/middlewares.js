const utils = require("./utils");

exports.notFound = (req, res, next) => {
  next({
    status: 404,
    message: "Not found",
  });
};

exports.errorHandler = (error, req, res, next) => {
  console.log(error);
  let status = error.status || 500;
  return res.status(status).json({
    message: error.message || "Something happened",
  });
};

exports.validate = (schema) => (req, res, next) => {
  try {
    const { error, value } = schema.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      {
        allowUnknown: true,
      }
    );
    if (error) {
      return next(error);
    }
    req.xop = {
      ...value,
    };
    next();
  } catch (e) {
    next({ ...e, status: 400 });
  }
};

exports.deserializeUser = (req, res, next) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");
  if (!accessToken) {
    return next();
  }
  const decoded = utils.verifyJWT(accessToken);
  res.locals.user = decoded;
  next();
};

exports.requireUser = (req, res, next) => {
  const user = res.locals.user;
  if (!user) {
    return next({
      status: 403,
      message: "Authorization required",
    });
  }
  next();
};
