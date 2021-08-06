const express = require("express");
const getFeed = require("./getFeed");
const get = require("./get");
const search = require("./search");
const getPosts = require("./getPosts");

const router = express.Router();

router.get("/feed", getFeed);
router.get("/search/", search);
router.get("/:username", get);
router.get("/:username/:type", getPosts);

module.exports = router;
