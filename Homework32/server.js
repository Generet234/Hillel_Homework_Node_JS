// Load variables from the .env file into process.env.
// This must run before anything else requires config/config.js or config/db.js,
// since both of those read values from process.env.
require('dotenv').config();

const express = require('express');
const config = require('./config/config');
const mongoose = require('mongoose');
const sequelize = require('./config/db');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const trackEvent = require('./middlewares/transferDataToMongoDB');

// Import the models here so Sequelize registers them (and their associations)
// before we call sequelize.sync() below.
require('./models/User');
require('./models/Product');

const app = express();

// Middleware для парсингу JSON
app.use(express.json());

app.use(trackEvent)


app.use('/users', usersRoutes)

app.use('/products', productsRoutes)

// Connect to MySQL and make sure the tables match our models.
// { alter: true } automatically adjusts existing tables to match the models
// (adds/changes columns as needed) - simple and convenient for a teaching
// project, but NOT recommended for real production apps (use migrations there).

Promise.all([sequelize.sync({ alter: true }), mongoose.connect(config.mongoURI)])
    .then(() => {
        console.log('Підключено до Баз Даних');
        // Запуск сервера після успішного підключення до БД
        app.listen(config.port, () => {
            console.log(`Сервер запущено на порті ${config.port}`);
        });
    })
    .catch(err => {
        console.error('Помилка підключення до Баз Даних', err);
    });