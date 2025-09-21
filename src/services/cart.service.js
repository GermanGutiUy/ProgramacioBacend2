import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';

const cartRepo = new CartRepository();
const productRepo = new ProductRepository();

export const getCartByUser = async (userId) => {
  let cart = await cartRepo.getByUserId(userId);
  if (!cart) {
    cart = await cartRepo.create({ user: userId, products: [] });
  }
  return cart;
};

export const addProductToUserCart = async (userId, productId, quantity = 1) => {
  const cart = await getCartByUser(userId);
  const product = await productRepo.getById(productId);
  if (!product) throw new Error('Producto no encontrado');
  if (product.stock < quantity) throw new Error('Stock insuficiente');

  return cartRepo.addProductToCart(cart._id, productId, quantity);
};
