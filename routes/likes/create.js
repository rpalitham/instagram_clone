const Likes = require("../../services/Likes");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { id, type } = req.params;
    let likeService = new Likes(user);
    let result = false;
    if (type === "like") {
      result = await likeService.create({ id, type: "post" });
    } else if (type === "unlike") {
      result = await likeService.delete({ id, type: "post" });
    }
    if (result) {
      res.json({ status: "ok" }).status(200);
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
