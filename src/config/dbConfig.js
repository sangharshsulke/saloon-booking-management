require('dotenv').config();

const parseIntOr = (value, fallback) => {
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? fallback : num;
};

const parseBool = (value, fallback = false) => {
  if (value === undefined || value === null) return fallback;
  return String(value).toLowerCase() === 'true';
};

const databaseUrl = process.env.DATABASE_URL;
let DB_HOST = process.env.DB_HOST || 'localhost';
let DB_PORT = parseIntOr(process.env.DB_PORT, 5432);
let DB_NAME = process.env.DB_NAME || 'salon_booking_system';
let DB_USER = process.env.DB_USER || 'postgres';
let DB_PASSWORD = process.env.DB_PASSWORD || '123456';
let DB_SSL = parseBool(process.env.DB_SSL, false);

if (databaseUrl) {
  try {
    const url = new URL(databaseUrl);
    DB_HOST = url.hostname || DB_HOST;
    DB_PORT = url.port ? parseIntOr(url.port, 5432) : DB_PORT;
    DB_NAME = url.pathname ? url.pathname.replace(/^\//, '') : DB_NAME;
    DB_USER = url.username || DB_USER;
    DB_PASSWORD = decodeURIComponent(url.password) || DB_PASSWORD;

    const sslMode = url.searchParams.get('sslmode');
    if (sslMode) {
      DB_SSL = sslMode !== 'disable' && sslMode !== 'false';
    }
  } catch (error) {
    console.warn('⚠️  Invalid DATABASE_URL format, falling back to individual DB_* variables.');
  }
}

module.exports = {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SSL
};
