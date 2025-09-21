import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { config } from '../config/config.js';
import UserRepository from '../repositories/user.repository.js';
import { sendMail } from './mail.service.js';

const userRepo = new UserRepository();

export const generateJwt = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES });
};

// Forgot password: generate token, store hashed token + expiry, send email with plain token (one-time link)
export const initiateForgotPassword = async (email) => {
  const user = await userRepo.getByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await userRepo.setResetToken(user._id, tokenHash, expiresAt);

  const link = `${config.FRONT_URL}/reset-password/${token}`;

  const html = `
    <p>Recibimos una solicitud para restablecer tu contraseña.</p>
    <p>Haz click en el siguiente botón (expira en 1 hora):</p>
    <p><a href="${link}">Restablecer mi contraseña</a></p>
    <p>Si no solicitaste esto, podés ignorar este email.</p>
  `;

  await sendMail({
    to: user.email,
    subject: 'Recuperación de contraseña - Ecommerce',
    html
  });

  return true;
};

// Reset password: verify token, expiry, ensure new password != old
export const resetPasswordWithToken = async (tokenPlain, newPassword) => {
  const tokenHash = crypto.createHash('sha256').update(tokenPlain).digest('hex');

  const user = await userRepo.dao.model.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) throw new Error('Token inválido o expirado');

  const same = await bcrypt.compare(newPassword, user.password);
  if (same) throw new Error('La nueva contraseña no puede ser igual a la anterior');

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return true;
};
