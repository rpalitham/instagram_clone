const Users = require("../../services/Users");

module.exports = async (req, res) => {
  try {
    let { user } = req;
    let { username } = req.params;
    let userService = new Users(user);
    let userData = await userService.get(username, user);
    res.json({ ...userData }).status(200);
  } catch (error) {
    let msg = {
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      errors: error,
    };
    res.status(500).send(msg);
  }
};
