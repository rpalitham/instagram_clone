const Users = require("../../services/Users");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { username, limit } = req.query;
    let userService = new Users(user);
    let users = await userService.search(username, limit);
    res.json(users).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
