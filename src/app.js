const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware để parse JSON
app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', sellerRoutes);
app.use(errorHandler);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Unable connect database', err));