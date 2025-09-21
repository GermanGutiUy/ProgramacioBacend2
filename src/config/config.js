export const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/fakeDB',
  JWT_SECRET: process.env.JWT_SECRET || 'fakejwtsecret',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
  COOKIE_NAME: process.env.COOKIE_NAME || 'token',
  FRONT_URL: process.env.FRONT_URL || 'http://localhost:3000',

  MAIL_HOST: process.env.MAIL_HOST || 'smtp.example.com',
  MAIL_PORT: process.env.MAIL_PORT || 587,
  MAIL_USER: process.env.MAIL_USER || 'fakeuser@example.com',
  MAIL_PASS: process.env.MAIL_PASS || 'fakepass',
};
