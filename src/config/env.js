// src/config/env.js
require('dotenv').config();

const parseIntOr = (value, fallback) => {
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? fallback : num;
};

const config = {
  // Server
  PORT: process.env.PORT || 1000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseIntOr(process.env.DB_PORT, 5432),
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SSL: process.env.DB_SSL === 'true' || process.env.PGSSLMODE === 'require',

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
const requiredEnvVars = [
  'JWT_SECRET',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD'
];

requiredEnvVars.forEach(varName => {
  if (!config[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

module.exports = config;