const Users = require("../models/Users");
const Relationships = require("../models/Relationships");
const Posts = require("../models/Posts");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class PostsService {
  constructor(user) {
    this.postsModel = new Posts(user);
    this.relationshipModel = new Relationships(user);
    this.userModel = new Users(user);
    this.user = { ...user };
  }

  async create({ payload, files }) {
    try {
      let { media_type, description } = payload;
      let posts_path = path.join(appPath, "USER_DATA/POSTS");
      let file_names = [];

      if (files.length > 0) {
        files.forEach((file) => {
          let file_name = `${uuidv4()}.png`;
          file_names.push(file_name);
          fs.writeFileSync(path.join(posts_path, file_name), file.buffer);
        });
        let obj = {
          media_type,
          description,
          media_path: file_names,
        };
        await this.postsModel.create(obj);
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      let post = await this.postsModel.findOne({ id });
      if (post) {
        post.media_path.forEach((file) => {
          fs.unlink(path.join(appPath, `/USER_DATA/POSTS/${file}`), (err) => {
            if (err) throw err;
          });
        });
      }
      await this.postsModel.delete({ id });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getFeed() {
    try {
      let userFeed = await this.postsModel.getFeed();
      return userFeed;
    } catch (err) {
      console.log("error", err);
    }
  }

  async get(username, type) {
    try {
      let options = {
        username: username,
      };
      let user = await this.userModel.findOne(options);
      if (user) {
        if (user.id !== this.user.id && user.privacy) {
          let condition = {
            [Op.or]: [
              {
                follower_id: this.user.id,
                following_id: user.id,
                status: "following",
              },
              {
                follower_id: user.id,
                following_id: this.user.id,
                status: "following",
              },
            ],
          };
          let user_following = await this.relationshipModel.findOne(condition);
          if (!user_following) {
            let error = new Error("User is private");
            error.name = "userIsPrivate";
            throw error;
          }
        }
        if (type === "posts") {
          let user_posts = await this.postsModel.readAll({
            created_by: user.id,
          });
          return user_posts;
        }
      } else {
        let error = new Error("User not found");
        error.name = "userNotFound";
        throw error;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = PostsService;
