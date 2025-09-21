import ProductRepository from '../repositories/product.repository.js';
const repo = new ProductRepository();

export const productService = {
  createProduct: async (data) => repo.create(data),
  updateProduct: async (id, data) => repo.update(id, data),
  deleteProduct: async (id) => repo.delete(id),
  getProductById: async (id) => repo.getById(id),
  getAllProducts: async (filter = {}) => repo.getAll(filter),
};
