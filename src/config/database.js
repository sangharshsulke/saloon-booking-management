const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');

const connectionOptions = {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {}
};

if (dbConfig.DB_SSL) {
  connectionOptions.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false
  };
}

const sequelize = dbConfig.DATABASE_URL
  ? new Sequelize(dbConfig.DATABASE_URL, connectionOptions)
  : new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
      host: dbConfig.DB_HOST,
      port: dbConfig.DB_PORT,
      ...connectionOptions
    });

console.log('Resolved DB connection:', {
  source: dbConfig.DATABASE_URL ? 'DATABASE_URL' : 'DB_* variables',
  DATABASE_URL: dbConfig.DATABASE_URL ? dbConfig.DATABASE_URL : undefined,
  DB_HOST: dbConfig.DB_HOST,
  DB_PORT: dbConfig.DB_PORT,
  DB_NAME: dbConfig.DB_NAME,
  DB_USER: dbConfig.DB_USER,
  DB_SSL: dbConfig.DB_SSL
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
  }
};

testConnection();

module.exports = sequelize;
