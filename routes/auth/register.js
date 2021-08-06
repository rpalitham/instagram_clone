const User = require("../../services/Users");

module.exports = async (req, res) => {
  try {
    let user_obj = req.body;
    let userService = new User();
    let saved_user = await userService.register(user_obj);
    res.status(201).json(saved_user);
  } catch (error) {
    console.log("error", error);
    if (error.name === "ValidationError") {
      res.status(402).send(error.message);
    } else if (error.name === "emailAlreadyExists") {
      res.status(202).send(error.message);
    } else {
      let msg = {
        message:
          "The server encountered an unexpected condition which prevented it from fulfilling the request.",
        errors: error,
      };
      res.status(500).send({ msg });
    }
  }
};
