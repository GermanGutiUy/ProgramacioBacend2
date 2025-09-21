import MongoDAO from './mongo.dao.js';
import { TicketModel } from '../models/ticket.model.js';

export default class TicketRepository {
  constructor() {
    this.dao = new MongoDAO(TicketModel);
  }

  async create(payload) {
    return this.dao.create(payload);
  }

  async getById(id) {
    return this.dao.getById(id);
  }
}
