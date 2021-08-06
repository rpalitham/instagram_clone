const Comments = require("../models/Comments");

class CommentsService {
  constructor(user) {
    this.commentsModel = new Comments(user);
    this.user = { ...user };
  }

  async create(id, payload) {
    try {
      let { text } = payload;
      let obj = {
        type: "post",
        text,
        parent_id: id,
        user_id: this.user.id,
      };
      await this.commentsModel.create(obj);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async get({ id, limit }) {
    try {
      let obj = {
        parent_id: id,
        user_id: this.user.id,
      };
      let comments = await this.commentsModel.readAll(obj, limit);
      let commentsCount = await this.commentsModel.countAll({ parent_id: id });
      return { comments, commentsCount };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete({ id, commentId }) {
    try {
      let like = await this.commentsModel.findOne({ id });
      if (like) {
        await this.commentsModel.delete({ id });
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentsService;
