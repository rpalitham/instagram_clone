const Likes = require("../../services/Likes");

module.exports = async (req, res) => {
  try {
    let { user, params } = req;
    let { id } = params;
    let likeService = new Likes(user);
    let result = await likeService.get({ id, type: "post" });
    if (result) {
      res.json(result).status(200);
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
