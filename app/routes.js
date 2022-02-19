const { Router } = require("express");
const router = Router();

const controller = require("./controller");
const schemas = require("./schemas");
const { validate } = require("./middlewares");

router.post(
  "/users",
  validate(schemas.createUserSchema),
  controller.createUser
);

router.post(
  "/sessions",
  validate(schemas.createSessionSchema),
  controller.createSession
);

module.exports = router;
