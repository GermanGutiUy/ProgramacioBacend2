import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }, // email
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: Number,
        price: Number
      }
    ]
  },
  { timestamps: true }
);

export const TicketModel = mongoose.model(ticketCollection, ticketSchema);
