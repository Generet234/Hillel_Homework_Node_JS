const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,     // name of the database, e.g. "lesson_db"
    process.env.DB_USER,     // MySQL username, e.g. "root"
    process.env.DB_PASSWORD, // MySQL password
    {
        host: process.env.DB_HOST, // e.g. "127.0.0.1"
        port: process.env.DB_PORT, // e.g. 3306
        dialect: 'mysql',          // tells Sequelize we're using MySQL (not Postgres/SQLite/etc.)
        logging: false              // set this to console.log if you want to see the raw SQL queries in the terminal
    }
);

module.exports = sequelize;