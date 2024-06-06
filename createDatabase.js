const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  const clientConfig = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  };

  if (process.env.DB_PASSWORD) {
    clientConfig.password = process.env.DB_PASSWORD;
  }

  const client = new Client(clientConfig);

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created successfully`);
  } catch (error) {
    if (error.code === '42P04') {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    } else {
      console.error('Error creating database:', error);
    }
  } finally {
    await client.end();
  }
};

module.exports = createDatabase;
