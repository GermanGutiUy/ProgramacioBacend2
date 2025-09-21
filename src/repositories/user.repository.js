import MongoDAO from './mongo.dao.js';
import { UserModel } from '../models/user.model.js';

export default class UserRepository {
  constructor() {
    this.dao = new MongoDAO(UserModel);
  }

  async getAll() {
    return this.dao.getAll();
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async getByEmail(email) {
    return this.dao.getOne({ email });
  }

  async create(payload) {
    return this.dao.create(payload);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async setResetToken(userId, tokenHash, expiresAt) {
    return this.dao.update(userId, { resetPasswordToken: tokenHash, resetPasswordExpires: expiresAt });
  }

  async clearResetToken(userId) {
    return this.dao.update(userId, { resetPasswordToken: null, resetPasswordExpires: null });
  }
}
