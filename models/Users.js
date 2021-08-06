const userSchema = require("../schemas/users");

class User {
  constructor() {
    this.UserSchema = userSchema;
  }

  async create(userObj) {
    return await this.UserSchema.create({
      ...userObj,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async findOne(condition) {
    return await this.UserSchema.findOne({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async readAll(condition, limit) {
    return await this.UserSchema.findAll({
      where: {
        ...condition,
      },
      limit: limit,
      raw: true,
    });
  }
}

module.exports = User;
