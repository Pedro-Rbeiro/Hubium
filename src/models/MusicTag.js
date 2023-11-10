const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const { Music } = require('./Music');
const { Tag } = require('./Tag');

const MusicTag = db.define('music_tag', {
  musicId: {
    type: DataTypes.INTEGER,
    references: {
      model: Music,
      key: 'id',
    },
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
  },
});

const postMusicTags = async (music, tags) => {
  await music.setTags(tags);
};

module.exports = {
  MusicTag,
  postMusicTags,
};
