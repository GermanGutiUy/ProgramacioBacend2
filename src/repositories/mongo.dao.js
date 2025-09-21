// DAO genérico para Mongo con Mongoose
export default class MongoDAO {
  constructor(model) {
    this.model = model;
  }

  async getAll(filter = {}, projection = null, options = {}) {
    return this.model.find(filter, projection, options).lean();
  }

  async getById(id, projection = null) {
    return this.model.findById(id, projection).lean();
  }

  async getOne(filter = {}, projection = null) {
    return this.model.findOne(filter, projection).lean();
  }

  async create(data) {
    const doc = await this.model.create(data);
    return doc.toObject();
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async updateOne(filter, update, options = {}) {
    return this.model.findOneAndUpdate(filter, update, { new: true, ...options }).lean();
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id).lean();
  }
}
