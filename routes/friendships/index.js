const express = require("express");
const create = require("./create");
const get = require("./get");
const update = require("./update");

const router = express.Router();

router.get("/:username", get);
router.post("/:userId/follow", create);
router.post("/:userId/:type", update);

module.exports = router;
