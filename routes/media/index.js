const express = require("express");
const getImage = require("./getImage");

const router = express.Router();

router.get("/image/:img_path", getImage);

module.exports = router;
