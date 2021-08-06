const express = require("express");
const create = require("./create");
const getPostLikes = require("./getPostLikes");

const router = express.Router();

router.post("/:id/:type", create);
router.get("/:id", getPostLikes);
// router.delete("/:id", deleteLike);

module.exports = router;
