const Comments = require("../../services/Comments");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { id, commentId } = req.params;
    let commentService = new Comments(user);
    await commentService.delete({ id, commentId });
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
