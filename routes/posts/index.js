const express = require("express");
const multer = require("multer");
const create = require("./create");
const get = require("./get");
const update = require("./update");
const deletePost = require("./delete");

const router = express.Router();
const upload = multer();

router.post("/", upload.array("files", 5), create);
// router.put("/:id", update);
// router.get("/:id", get);
router.delete("/:id", deletePost);

module.exports = router;
