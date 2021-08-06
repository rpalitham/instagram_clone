const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearer_token = req.header("Authorization");
  const token = bearer_token.split(" ")[1];

  if (!token) return res.send("Access Denied").status(401);
  jwt.verify(token, "SECRET_TOKEN", function (err, decoded) {
    if (err) {
      res
        .json({
          success: false,
          message: "Failed to authenticate token. The token is expired",
        })
        .status(401);
      return;
    } else {
      // if everything is good, save to request for use in other routes
      req.user = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
