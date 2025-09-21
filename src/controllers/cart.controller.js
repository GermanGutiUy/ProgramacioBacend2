import * as cartService from '../services/cart.service.js';

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { productId, quantity = 1 } = req.body;
    const result = await cartService.addProductToUserCart(userId, productId, Number(quantity));
    res.json({ status: 'success', payload: result });
  } catch (err) {
    next(err);
  }
};

export const getMyCart = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const cart = await cartService.getCartByUser(userId);
    res.json({ status: 'success', payload: cart });
  } catch (err) {
    next(err);
  }
};
