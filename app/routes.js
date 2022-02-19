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
router.post(
  "/shares",
  [validate(schemas.createShareSchema), requireUser],
  controller.createShare
);
router.get("/shares", requireUser, controller.getUserShares);
router.put(
  "/shares/:id",
  [validate(schemas.updateShareSchema), requireUser],
  controller.updateShare
);

module.exports = router;
