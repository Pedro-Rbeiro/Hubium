const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const Tag = db.define('tag', {
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  }
});

module.exports = Tag;
