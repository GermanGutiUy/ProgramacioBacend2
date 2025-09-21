import TicketRepository from '../repositories/ticket.repository.js';
import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import { v4 as uuidv4 } from 'uuid';

const ticketRepo = new TicketRepository();
const cartRepo = new CartRepository();
const productRepo = new ProductRepository();

export const createTicketForUser = async (user) => {
  const cart = await cartRepo.getByUserId(user._id);
  if (!cart || !cart.products || cart.products.length === 0) throw new Error('Carrito vacío');

  let total = 0;
  const purchased = [];
  const notPurchased = [];

  // Iterate and check stock
  for (const item of cart.products) {
    const product = await productRepo.getById(item.product);
    if (!product) {
      notPurchased.push({ product: item.product, reason: 'No existe' });
      continue;
    }
    if (product.stock < item.quantity) {
      notPurchased.push({ product: product._id, reason: 'Stock insuficiente' });
      continue;
    }

    // Reduce stock
    await productRepo.update(product._id, { stock: product.stock - item.quantity });

    // accumulate
    total += product.price * item.quantity;
    purchased.push({ product: product._id, quantity: item.quantity, price: product.price });
  }

  if (purchased.length === 0) throw new Error('No hubo productos disponibles para compra');

  const ticketPayload = {
    code: uuidv4(),
    purchase_datetime: new Date(),
    amount: total,
    purchaser: user.email,
    products: purchased
  };

  const ticket = await ticketRepo.create(ticketPayload);

  // Clear only purchased items from cart
  const remaining = cart.products.filter(cp =>
    !purchased.some(p => p.product.toString() === cp.product.toString())
  );

  await cartRepo.update(cart._id, { products: remaining });

  return { ticket, notPurchased };
};
