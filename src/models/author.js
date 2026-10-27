const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Author',
    tableName: 'Authors',
    timestamps: true,
  }
);

module.exports = Author;