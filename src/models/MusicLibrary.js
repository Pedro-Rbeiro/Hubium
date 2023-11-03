const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const MusicLibrary = db.define('music_library', {});

module.exports = {
    MusicLibrary,
}