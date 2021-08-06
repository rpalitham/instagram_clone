const Comments = require("../../services/Comments");

module.exports = async (req, res) => {
  try {
    let { body, user } = req;
    let { id } = req.params;
    let commentsService = new Comments(user);
    let result = await commentsService.create(id, body);
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
