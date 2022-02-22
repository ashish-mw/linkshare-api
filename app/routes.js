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
router.get(
  "/shares/:id",
  [validate(schemas.getShareSchema), requireUser],
  controller.getUserShareInfo
);
router.put(
  "/shares/:id",
  [validate(schemas.updateShareSchema), requireUser],
  controller.updateShare
);
router.delete(
  "/shares/:id",
  [validate(schemas.deleteShareSchema), requireUser],
  controller.deleteShare
);

// public link fetch
router.get(
  "/shares/all",
  validate(schemas.getAllSharesSchema),
  controller.getAllShares
);

module.exports = router;
