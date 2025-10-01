const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;