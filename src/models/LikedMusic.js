const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const { User } = require('./User');
const { Music } = require('./Music');

const LikedMusic = db.define('liked_music', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  musicId: {
    type: DataTypes.INTEGER,
    references: {
      model: Music,
      key: 'id',
    },
  },
});

const setLikedMusic = async (userId, musicId) => {
  await LikedMusic.create({ userId, musicId });
};

const deleteLikedMusic = async (userId, musicId) => {
  await LikedMusic.destroy({ where: { userId: userId, musicId: musicId } });
};

const findMusicLiked = async (userId, musicId) => {
  return LikedMusic.findOne({
    where: { userId: userId, musicId: musicId },
  });
};

const getLikedMusics = async (userId) => {
  return LikedMusic.findAll({
    where: { userId: userId },
    raw: true,
  });
};

module.exports = {
  LikedMusic,
  setLikedMusic,
  deleteLikedMusic,
  findMusicLiked,
  getLikedMusics,
};
