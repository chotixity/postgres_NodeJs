const { Sequelize } = require('sequelize');
const config = require('./config.js').development;

const sequelizeConfig = {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: config.logging,
};

if (config.password) {
  sequelizeConfig.password = config.password;
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password || null,
  sequelizeConfig
);

module.exports = sequelize;
