const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    // let { user } = req;
    let { img_path } = req.params;
    let imageDir = path.join(appPath, "USER_DATA");
    fs.readFile(`${imageDir}/POSTS/${img_path}`, function (err, content) {
      if (err) {
        let error = new Error("Image not found");
        error.name = "invalidImage";
        throw error;
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": "image/jpg" });
        res.end(content);
      }
    });
  } catch (error) {
    console.log("error", error);
    if (error.name === "invalidImage") {
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
