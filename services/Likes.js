const Likes = require("../models/Likes");

class LikesService {
  constructor(user) {
    this.likesModel = new Likes(user);
    this.user = { ...user };
  }

  async create(payload) {
    try {
      let { type, id } = payload;
      let obj = {
        type,
        parent_id: id,
        user_id: this.user.id,
      };
      await this.likesModel.create(obj);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async get({ id, type }) {
    try {
      let obj = {
        type,
        parent_id: id,
        user_id: this.user.id,
      };
      let userLiked = await this.likesModel.findOne(obj);
      let likesCount = await this.likesModel.countAll({ type, parent_id: id });
      userLiked = userLiked ? true : false;
      return { userLiked, likesCount };
    } catch (error) {
      throw error;
    }
  }

  async delete({ id, type }) {
    try {
      let like = await this.likesModel.findOne({
        parent_id: parseInt(id),
        type,
      });
      if (like) {
        await this.likesModel.delete({ id: like.id });
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LikesService;
