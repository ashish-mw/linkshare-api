const { Router } = require("express");
const router = Router();

const controller = require("./controller");

router.post("/users", controller.createUser);

module.exports = router;
