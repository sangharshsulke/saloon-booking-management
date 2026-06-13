// src/config/env.js
require('dotenv').config();

const parseBool = (value, fallback = false) => {
  if (value === undefined || value === null) return fallback;
  return String(value).toLowerCase() === 'true';
};

const config = {
  // Server
  PORT: process.env.PORT || 1000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SSL: parseBool(process.env.DB_SSL, false),

  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // File Upload
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',

  // Pagination
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE) || 100,

  // Email (for future implementation)
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  // SMS (for future implementation)
  SMS_API_KEY: process.env.SMS_API_KEY,
  SMS_SENDER_ID: process.env.SMS_SENDER_ID
};

// Validate required variables
const requiredEnvVars = ['JWT_SECRET'];

if (!config.DATABASE_URL) {
  requiredEnvVars.push('DB_NAME', 'DB_USER', 'DB_PASSWORD');
}

requiredEnvVars.forEach(varName => {
  if (!config[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

module.exports = config;