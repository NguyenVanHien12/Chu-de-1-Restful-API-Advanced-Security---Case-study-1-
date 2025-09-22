const express = require('express');
const app = express();
const productRoutes = require('./routes/products.js');
const errorHandler = require('./middlewares/errorHandler');


app.use(express.json());
app.use('/api/v1/products', productRoutes);
app.use(errorHandler);

//Khoi dong server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

