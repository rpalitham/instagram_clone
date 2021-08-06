const Posts = require("../../services/Posts");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let postService = new Posts(user);
    let userFeed = await postService.getFeed();
    res.json(userFeed).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
