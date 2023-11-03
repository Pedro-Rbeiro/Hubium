const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const { Music } = require('./Music');

const Album = db.define('album', {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  link: {
    type: DataTypes.STRING,
    required: true,
  },
});

module.exports = {
  Album,
};