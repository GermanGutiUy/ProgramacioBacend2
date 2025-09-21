// Usa Passport si lo tenés inicializado; si no, también hay fallback JWT
import passport from '../passport/index.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

/**
 * Preferimos usar passport (tu proyecto ya lo tiene).
 * Si por alguna razón no querés passport en una ruta, podés usar verifyJWT directamente.
 */
export const requireAuth = (req, res, next) => {
  // Passport authenticate middleware wrapper:
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ status: 'error', error: 'No autenticado' });
    req.user = user;
    return next();
  })(req, res, next);
};

// Alternativa directa (si no querés passport):
export const verifyJWT = (req, res, next) => {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if (!token) return res.status(401).json({ status: 'error', error: 'Token requerido' });
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ status: 'error', error: 'Token inválido' });
  }
};
