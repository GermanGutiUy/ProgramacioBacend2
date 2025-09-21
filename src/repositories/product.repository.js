import { ProductModel } from '../models/product.model.js';

export default class ProductRepository {
  async create(data) {
    const product = await ProductModel.create(data);
    return product.toObject();
  }

  async update(id, data) {
    const updated = await ProductModel.findByIdAndUpdate(id, data, { new: true }).lean();
    return updated;
  }

  async delete(id) {
    const deleted = await ProductModel.findByIdAndDelete(id).lean();
    return deleted;
  }

  async getById(id) {
    const product = await ProductModel.findById(id).lean();
    return product;
  }

  async getAll(filter = {}) {
    const products = await ProductModel.find(filter).lean();
    return products;
  }
}
