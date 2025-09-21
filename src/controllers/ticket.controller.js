import { createTicketForUser } from '../services/ticket.service.js';

export const checkout = async (req, res, next) => {
  try {
    const user = req.user; // debe contener id y email
    const { ticket, notPurchased } = await createTicketForUser(user);
    res.json({ status: 'success', payload: { ticket, notPurchased } });
  } catch (err) {
    next(err);
  }
};
