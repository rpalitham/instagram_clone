const Likes = require("../../services/Likes");

module.exports = async (req, res) => {
  try {
    let { user, params } = req;
    let { commentId, type } = params;
    let likesService = new Likes(user);
    let result = false;
    if (type === "like") {
      result = await likesService.create({ id: commentId, type: "comment" });
    } else if (type === "unlike") {
      result = await likesService.delete({ id: commentId, type: "comment" });
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
