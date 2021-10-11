const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(dbConfig);
connection.authenticate()
  .then(() => { console.log('db connection created') })
  .catch((error) => { console.log(error) });

User.init(connection)

module.exports = connection;