class Comments {
  constructor(user) {
    this.commentSchema = sequelize.import("../Schemas/comments");
    this.userSchema = sequelize.import("../Schemas/users");
    this.likesSchema = sequelize.import("../Schemas/likes");
    this.user = { ...user };
  }

  async create(like) {
    return await this.commentSchema.create({
      ...like,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: this.user.id,
      updated_by: this.user.id,
    });
  }

  async findOne(condition) {
    return await this.commentSchema.findOne({
      where: {
        ...condition,
      },
    });
  }

  async readAll(condition, limit) {
    this.commentSchema.belongsTo(this.userSchema, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    this.commentSchema.belongsTo(this.likesSchema, {
      foreignKey: "id",
      targetKey: "parent_id",
    });
    return await this.commentSchema.findAndCountAll({
      where: {
        ...condition,
      },
      include: [
        {
          model: this.likesSchema,
          attributes: ["user_id", "type", "parent_id"],
        },
        {
          model: this.userSchema,
          attributes: ["full_name", "bio", "username"],
        },
      ],
      order: [["created_at", "DESC"]],
      raw: true,
      limit: limit,
    });
  }

  async countAll(condition) {
    return await this.commentSchema.count({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async delete(condition) {
    return await this.commentSchema.destroy({
      where: {
        ...condition,
      },
    });
  }
}

module.exports = Comments;
