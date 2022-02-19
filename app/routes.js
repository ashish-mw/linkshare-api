const { Router } = require("express");
const router = Router();

const controller = require("./controller");
const schemas = require("./schemas");
const { validate, requireUser } = require("./middlewares");

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

router.get("/users", requireUser, controller.getUser);

module.exports = router;
