const Relationships = require("../../services/Relationships");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { userId } = req.params;
    let relationshipService = new Relationships(user);
    let result = await relationshipService.create(userId);
    res.json({ status: "ok", ...result }).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
