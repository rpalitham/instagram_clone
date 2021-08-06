const Posts = require("../../services/Posts");

module.exports = async (req, res) => {
  try {
    let { files, body, user } = req;
    let { payload } = body;
    payload = JSON.parse(payload);
    let postService = new Posts(user);
    let result = await postService.create({ payload, files });
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
