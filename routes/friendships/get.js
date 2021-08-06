const Relationships = require("../../services/Relationships");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { username } = req.params;
    let relationshipService = new Relationships(user);
    let result = await relationshipService.get(username);
    res.json({ ...result }).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
