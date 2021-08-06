const express = require("express");
const auth = require("./auth");
const friendships = require("./friendships");
const likes = require("./likes");
const comments = require("./comments");
const media = require("./media");
const posts = require("./posts");
const userDetails = require("./userDetails");
const verifyToken = require("./verifyToken");

const router = express.Router();

router.use("/auth", auth);
router.use("/media", media);
router.use(verifyToken);
router.use("/user", userDetails);
router.use("/friendships", friendships);
router.use("/post", posts);
router.use("/likes", likes);
router.use("/comments", comments);

module.exports = router;
