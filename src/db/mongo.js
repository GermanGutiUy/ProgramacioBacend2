import mongoose from 'mongoose';
import { config } from '../config/config.js';

export async function connectMongo() {
  try {
    await mongoose.connect(config.MONGO_URI, { dbName: 'ecommerce' });
    console.log('✅ MongoDB conectado (ficticio)');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB (ficticio):', err.message);
  }
}
