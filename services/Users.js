const Users = require("../models/Users");
const Relationships = require("../models/Relationships");
const Posts = require("../models/Posts");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
  constructor(user) {
    this.userModel = new Users(user);
    this.postModel = new Posts(user);
    this.relationshipModel = new Relationships(user);
    this.user = { ...user };
  }

  async register(user) {
    try {
      let options = {
        email: user.email,
      };
      const email_exists = await this.userModel.findOne(options);
      if (email_exists) {
        let error = new Error("email already exists");
        error.name = "emailAlreadyExists";
        throw error;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      let { username, email, auth_type, fullname } = user;
      let data = {
        id: uuidv4(),
        username,
        email,
        fullname,
        auth_type,
        password: hashedPassword,
        privacy: false,
      };
      const savedUser = await this.userModel.create(data);
      return savedUser;
    } catch (err) {
      throw err;
    }
  }

  async login(user) {
    try {
      let options = {
        email: user.email,
      };

      let found_user = await this.userModel.findOne(options);
      if (!found_user) {
        let error = new Error("email doesn't exists");
        error.name = "emailNotExists";
        throw error;
      }

      const isPasswordValid = await bcrypt.compare(
        user.password,
        found_user.password
      );
      if (!isPasswordValid) {
        let error = new Error("Invalid Password");
        error.name = "invalidPassword";
        throw error;
      }

      let { email, password, id, username, full_name } = found_user;

      console.log(id);

      let token = jwt.sign(
        { email: email, password: password, id: id },
        "SECRET_TOKEN",
        {
          expiresIn: "1h",
        }
      );
      return { token, username, full_name, id };
    } catch (error) {
      throw error;
    }
  }

  async search(user, limit) {
    try {
      let condition = {
        [Op.or]: {
          username: {
            [Op.iLike]: `%${user}%`,
          },
          fullname: {
            [Op.iLike]: `%${user}%`,
          },
        },
      };
      let users = await this.userModel.readAll(condition, limit);
      return users;
    } catch (err) {
      console.log("Error while searching users", err);
    }
  }

  async get(username, loggedInUser) {
    try {
      let options = {
        username: username,
      };
      let user = await this.userModel.findOne(options);
      if (user) {
        let result = {};
        let user_following = await this.relationshipModel.findOne({
          follower_id: loggedInUser.id,
          following_id: user.id,
        });

        if (user.id !== loggedInUser.Id && user_following) {
          result["following"] = true;
        } else {
          result["following"] = false;
        }
        let postsCount = await this.postModel.count({ created_by: user.id });
        let followersCount = await this.relationshipModel.count({
          following_id: user.id,
          status: "following",
        });
        let followingCount = await this.relationshipModel.count({
          follower_id: user.id,
          status: "following",
        });
        let { username, full_name, bio, profile_pic, privacy, id } = user;
        result = {
          ...result,
          postsCount,
          followingCount,
          followersCount,
          username,
          full_name,
          bio,
          profile_pic,
          privacy,
          id,
        };
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
