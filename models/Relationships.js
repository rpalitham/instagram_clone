const relationshipSchema = require("../schemas/relationships");

class Relationships {
  constructor(user) {
    this.RelationshipsSchema = relationshipSchema;
    this.user = { ...user };
  }

  async create(relation) {
    return await this.RelationshipsSchema.create({
      ...relation,
      created_at: new Date(),
      updated_at: new Date(),
      created_by: this.user.id,
      updated_by: this.user.id,
    });
  }

  async findOne(condition) {
    return await this.RelationshipsSchema.findOne({
      where: {
        ...condition,
      },
    });
  }

  async readAll(condition) {
    return await this.RelationshipsSchema.findAndCountAll({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async count(condition) {
    return await this.RelationshipsSchema.count({
      where: {
        ...condition,
      },
      raw: true,
    });
  }

  async update(friendship, condition) {
    return await this.RelationshipsSchema.update(
      {
        ...friendship,
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

module.exports = Relationships;
