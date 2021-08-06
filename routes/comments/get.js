const Comments = require("../../services/Comments");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { id } = req.params;
    let { limit } = req.query;
    let commentService = new Comments(user);
    let data = await commentService.get({ id, limit: limit });
    res.json(data).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
