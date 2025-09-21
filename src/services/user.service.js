import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
const repo = new UserRepository();

export const createUser = async ({ first_name, last_name, email, age, password, role = 'user' }) => {
  const exists = await repo.getByEmail(email);
  if (exists) throw new Error('Email ya registrado');
  const hashed = await bcrypt.hash(password, 10);
  const user = await repo.create({ first_name, last_name, email, age, password: hashed, role });
  return user;
};

export const getUserById = async (id) => {
  return repo.getById(id);
};
