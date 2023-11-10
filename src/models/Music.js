const db = require('../db/conn');
const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

const { MusicTag } = require('./MusicTag');
const { Tag } = require('./Tag');
const { User } = require('../models/User');
const sequelize = require('../db/conn');

const Music = db.define('music', {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  link: {
    type: DataTypes.STRING,
    required: true,
  },
  link_photo: {
    type: DataTypes.STRING,
    required: true,
  },
  qtdmsc: {
    type: DataTypes.INTEGER,
    required: true,
  },
  artist: {
    type: DataTypes.STRING,
    required: true,
  },
});

Music.belongsToMany(Tag, {
  through: {
    model: MusicTag,
  },
});

Tag.belongsToMany(Music, {
  through: {
    model: MusicTag,
  },
});

const createProject = async (data) => {
  return await Music.create(data);
};

const getAllMusic = async () => {
  return await Music.findAll({
    order: sequelize.literal('createdAt DESC'),
    raw: true,
  });
};

const getMusic = async (id) => {
  return await Music.findByPk(id, {
    include: { model: Tag },
  });
};

const findMusicLink = async (link) => {
  return await Music.findOne({ where: { link: link }, raw: true });
};

const searchMusic = async (search) => {
  return await Music.findAll({
    raw: true,
    where: { name: { [Op.substring]: search } },
  });
};

// const getMusicTags = async (musicId) => {
//   return await Music.findByPk(musicId, {include: Tag});
// }

module.exports = {
  Music,
  createProject,
  getAllMusic,
  getMusic,
  findMusicLink,
  searchMusic,
};
