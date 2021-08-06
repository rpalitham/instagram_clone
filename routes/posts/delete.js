const Likes = require("../../services/Likes");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { id } = req.params;
    let likeService = new Likes(user);
    let result = await likeService.delete(id);
    if (result) res.json({ status: "ok" }).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
