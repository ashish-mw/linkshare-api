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
