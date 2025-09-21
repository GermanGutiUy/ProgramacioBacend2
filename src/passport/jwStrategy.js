import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/user.model.js';
import { config } from '../config/config.js';

if (!config.JWT_SECRET) {
  // Mensaje claro para que no te quedes con el error genérico de passport
  throw new Error('JWT_SECRET no está definido. Añadí JWT_SECRET en tu .env y reiniciá el servidor.');
}

function cookieExtractor(req) {
  if (req && req.cookies) {
    return req.cookies[config.COOKIE_NAME] || null;
  }
  return null;
}

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      cookieExtractor,
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    secretOrKey: config.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      // Tu generateToken usa payload.uid — por eso buscamos jwtPayload.uid
      const user = await UserModel.findById(jwtPayload.uid).lean();
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);
