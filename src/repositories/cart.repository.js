import MongoDAO from './mongo.dao.js';
import { CartModel } from '../models/cart.model.js';

export default class CartRepository {
  constructor() {
    this.dao = new MongoDAO(CartModel);
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async getByUserId(userId) {
    return this.dao.getOne({ user: userId });
  }

  async create(payload) {
    return this.dao.create(payload);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await this.dao.getById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    const idx = cart.products.findIndex(p => p.product.toString() === productId.toString());
    if (idx >= 0) {
      cart.products[idx].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    return this.dao.update(cartId, { products: cart.products });
  }

  async clear(userId) {
    const cart = await this.getByUserId(userId);
    if (!cart) return null;
    return this.update(cart._id, { products: [] });
  }
}
