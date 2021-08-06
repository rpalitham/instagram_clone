const Posts = require("../../services/Posts");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { id } = req.params;
    let postService = new Posts(user);
    await postService.delete(id);
    res.json({ status: "ok" }).status(200);
  } catch (error) {
    console.log("error =====> ", error);
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
