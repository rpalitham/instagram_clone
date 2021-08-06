const postSchema = require("../schemas/posts");
const userSchema = require("../schemas/users");
const relationshipSchema = require("../schemas/relationships");
const commentSchema = require("../schemas/comments");
const likesSchema = require("../schemas/likes");

class Posts {
  constructor(user) {
    this.postsSchema = postSchema;
    this.userSchema = userSchema;
    this.relationSchema = relationshipSchema;
    this.commentSchema = commentSchema;
    this.likeSchema = likesSchema;
    this.user = { ...user };
  }

  async create(post) {
    return await this.postsSchema.create({
      ...post,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: this.user.id,
      updated_by: this.user.id,
    });
  }

  async findOne(condition) {
    return await this.postsSchema.findOne({
      where: {
        ...condition,
      },
    });
  }

  async count(condition) {
    return await this.postsSchema.count({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  // attributes: {
  //   include: [
  //     [
  //       sequelize.literal(
  //         `(
  //           SELECT COUNT(*)
  //           FROM "LIKES"
  //           WHERE
  //               parent_id = "POSTS".id
  //       )`
  //       ),
  //       "likesCount",
  //     ],
  //     [
  //       sequelize.literal(
  //         `(
  //           SELECT COUNT(*)
  //           FROM "COMMENTS"
  //           WHERE
  //               parent_id = "POSTS".id
  //       )`
  //       ),
  //       "commentsCount",
  //     ],
  //   ],
  // },

  async readAll(condition) {
    return await this.postsSchema.findAndCountAll({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async delete(condition) {
    return await this.postsSchema.destroy({
      where: {
        ...condition,
      },
    });
  }

  async getFeed() {
    this.postsSchema.belongsTo(this.userSchema, {
      foreignKey: "created_by",
      targetKey: "id",
    });
    return await this.postsSchema.findAll({
      where: {
        [Op.or]: [
          { created_by: this.user.id },
          {
            created_by: {
              [Op.in]: [
                sequelize.literal(
                  `SELECT following_id FROM "RELATIONSHIPS" WHERE follower_id = '${this.user.id}'`
                ),
              ],
            },
          },
        ],
      },
      include: [
        {
          model: this.userSchema,
          attributes: ["full_name", "bio", "username"],
          where: {
            [Op.or]: [
              {
                id: this.user.id,
              },
              {
                id: {
                  [Op.in]: [
                    sequelize.literal(
                      `SELECT following_id FROM "RELATIONSHIPS" WHERE follower_id = '${this.user.id}'`
                    ),
                  ],
                },
              },
            ],
          },
          raw: true,
        },
      ],
      order: [["created_at", "DESC"]],
      raw: true,
      limit: 10,
    });
  }

  async update(post, condition) {
    return await this.postsSchema.update(
      {
        ...post,
        updated_at: new Date(),
        updated_by: this.user.id,
      },
      {
        where: {
          ...condition,
        },
      }
    );
  }
}

module.exports = Posts;
