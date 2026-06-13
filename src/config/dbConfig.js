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

const isLocalHost = (host) => {
  if (!host) return false;
  return ['localhost', '127.0.0.1', '::1'].includes(host.toLowerCase());
};

let DB_SSL;
if (process.env.DB_SSL !== undefined) {
  DB_SSL = parseBool(process.env.DB_SSL, false);
} else if (process.env.DB_HOST && !isLocalHost(process.env.DB_HOST)) {
  DB_SSL = true;
} else {
  DB_SSL = false;
}

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
    } else if (!isLocalHost(DB_HOST)) {
      DB_SSL = true;
    }
  } catch (error) {
    console.warn('⚠️  Invalid DATABASE_URL format, falling back to individual DB_* variables.');
  }
}

console.log('DB config resolved:', {
  source: databaseUrl ? 'DATABASE_URL' : 'DB_* variables',
  DATABASE_URL: databaseUrl ? databaseUrl : undefined,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_SSL
});

module.exports = {
  DATABASE_URL: databaseUrl,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SSL
};
