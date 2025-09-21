import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, default: '' },
    thumbnails: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model(productCollection, productSchema);
