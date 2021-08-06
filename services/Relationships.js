const Users = require("../models/Users");
const Relationships = require("../models/Relationships");

class RelationshipService {
  constructor(user) {
    this.relationshipModel = new Relationships(user);
    this.userModel = new Users(user);
    this.user = { ...user };
  }

  async create(userId) {
    try {
      let following_user = await this.userModel.findOne({ id: userId });
      let req_obj = {
        follower_id: this.user.id,
        following_id: userId,
      };
      if (following_user.privacy) {
        req_obj["status"] = "requested";
      } else {
        req_obj["status"] = "following";
      }
      await this.relationshipModel.create(req_obj);
      return { result: req_obj.status };
    } catch (error) {
      throw error;
    }
  }

  async get(username) {
    try {
      let options = {
        username: username,
      };
      let user = await this.userModel.findOne(options);
      if (user) {
        let result = {};
        if (user.id !== this.user.id) {
          let user_following = await this.relationshipModel.findOne({
            follower_id: this.user.id,
            following_id: user.id,
          });
          if (user_following) {
            result["following"] = true;
          } else {
            result["following"] = false;
          }
          return result;
        } else {
          return { following: true };
        }
      } else {
        let error = new Error("user not found");
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }

  async update({ userId, type }) {
    try {
      if (type === "unfollow") {
        let { id } = await this.relationshipModel.findOne({
          follower_id: this.user.id,
          following_id: userId,
        });
        if (id) {
          let result = await this.relationshipModel.update(
            { status: "unfollowed" },
            { id }
          );
          return { result: "unfollowed" };
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RelationshipService;
