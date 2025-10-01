const sequelize = require('./config/database');
const Product = require('./models/product');
const Category = require('./models/category');
const Seller = require('./models/seller');

Product.belongsTo(Category, {foreignKey: 'categoryId'});
Product.belongsTo(Seller, {foreignKey: 'sellerId'});

//Dong bo hoa models vs database
sequelize.sync({alter: true})
    .then(() => {
    console.log('Database & tables created!');
    process.exit();
    })
  .catch(err => {
    console.error('Error synchronizing models:', err);
    process.exit(1);
  });