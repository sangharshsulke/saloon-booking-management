require('dotenv').config();

const parseIntOr = (value, fallback) => {
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? fallback : num;
};

module.exports = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseIntOr(process.env.DB_PORT, 5432),
  DB_NAME: process.env.DB_NAME || 'salon_booking_system',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '123456'
};
