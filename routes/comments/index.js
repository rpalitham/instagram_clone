const express = require("express");
const create = require("./create");
const get = require("./get");
const likeComment = require("./likeComment");
const deleteComment = require("./delete");

const router = express.Router();

router.post("/:id/add", create);
router.get("/:id", get);
router.post("/:type/:commentId", likeComment);
router.delete("/:id/delete/:commentId", deleteComment);

module.exports = router;
