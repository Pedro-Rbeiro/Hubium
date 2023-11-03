const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const MusicTag = db.define('music_tag', {});

module.exports = {
  MusicTag,
};
