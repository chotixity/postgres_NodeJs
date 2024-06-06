require('dotenv').config();
const createDatabase = require('./createDatabase');
const sequelize = require('./config/database.js');
const User = require('./models/user.js');

(async () => {
  try {
    // Create the database if it doesn't exist
    await createDatabase();

    // Authenticate and sync the database
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");

    await sequelize.sync({ force: true }); // This will drop the table if it already exists and create a new one
    console.log("All models were synchronized successfully.");

    // Adding some records
    await User.create({ name: 'John Doe', email: 'john@example.com' });
    await User.create({ name: 'Jane Smith', email: 'jane@example.com' });

    console.log("Records added successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
})();
