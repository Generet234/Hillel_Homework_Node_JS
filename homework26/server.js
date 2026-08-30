const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config.js');
const authRoutes = require('./routes/authRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/products', productsRoutes);

app.use('/api/orders', orderRoutes);

mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, withCredentials: true})
    .then(() => {
        console.log('Connected successfully!');
        app.listen(config.port, () => {
            console.log('Server started on port ' + config.port);
        })
})
.catch((err) => {
    console.error(err);
})