const likesSchema = require("../schemas/likes");

class Likes {
  constructor(user) {
    this.likesSchema = likesSchema;
    this.user = { ...user };
  }

  async create(like) {
    return await this.likesSchema.create({
      ...like,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: this.user.id,
      updated_by: this.user.id,
    });
  }

  async findOne(condition) {
    return await this.likesSchema.findOne({
      where: {
        ...condition,
      },
    });
  }

  async readAll(condition) {
    return await this.likesSchema.findAndCountAll({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async countAll(condition) {
    return await this.likesSchema.count({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async delete(condition) {
    return await this.likesSchema.destroy({
      where: {
        ...condition,
      },
    });
  }
}

module.exports = Likes;
