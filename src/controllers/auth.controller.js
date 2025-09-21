import UserRepository from '../repositories/user.repository.js';
import { generateJwt } from '../services/auth.service.js';
import { createHash, isValidPassword } from '../utils/hash.js'; // si ya tenés hash util, usa el tuyo
import UserModel from '../models/user.model.js';
import { initiateForgotPassword, resetPasswordWithToken } from '../services/auth.service.js';

const userRepo = new UserRepository();

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo.getByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const valid = await isValidPassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = generateJwt(user);
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await initiateForgotPassword(email);
    res.json({ message: 'Email de recuperación enviado (si existe la cuenta).' });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    await resetPasswordWithToken(token, newPassword);
    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (err) {
    next(err);
  }
};
