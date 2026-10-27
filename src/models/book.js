const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'Books',
    timestamps: true,
  }
);

module.exports = Book;