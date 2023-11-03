const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const LikedMusic = db.define('liked_music', {});

module.exports = {
    LikedMusic,
}