const User = require("../../services/Users");

module.exports = async (req, res) => {
  try {
    let user_obj = req.body;
    let userService = new User();
    let user = await userService.login(user_obj);
    if (user.token) {
      res.json({ ...user, authorized: true }).status(200);
    }
  } catch (error) {
    console.log("error", error);
    if (error.name === "ValidationError") {
      res.status(402).send(error.message);
    } else if (error.name === "invalidPassword") {
      res.status(400).send(error.message);
    } else if (error.name === "emailNotExists") {
      res.status(400).send(error.message);
    } else {
      let msg = {
        message:
          "The server encountered an unexpected condition which prevented it from fulfilling the request.",
        errors: error,
      };
      res.status(500).send(msg);
    }
  }
};
