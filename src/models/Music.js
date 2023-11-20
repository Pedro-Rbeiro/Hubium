const db = require('../db/conn');
const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

const { MusicTag } = require('./MusicTag');
const { Tag } = require('./Tag');

const sequelize = require('../db/conn');

const Music = db.define('music', {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  type: {
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

const getAllAlbums = async () => {
  return await Music.findAll({
    order: sequelize.literal('createdAt DESC'),
    where: { type: 'albums' },
    raw: true,
  });
};

const getAllTracks = async () => {
  return await Music.findAll({
    order: sequelize.literal('createdAt DESC'),
    where: { type: 'tracks' },
    raw: true,
  });
};

const getMusics = async (musicIds) => {
  return await Music.findAll({
    where: { id: musicIds },
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

const findUserProjects = async (userId) => {
  return await Music.findAll({
    where: { userId: userId },
    order: sequelize.literal('createdAt DESC'),
    raw: true,
  });
};

module.exports = {
  Music,
  createProject,
  getAllAlbums,
  getAllTracks,
  getMusics,
  getMusic,
  findMusicLink,
  searchMusic,
  findUserProjects,
};
