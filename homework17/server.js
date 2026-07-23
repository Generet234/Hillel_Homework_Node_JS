require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/users', productRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})