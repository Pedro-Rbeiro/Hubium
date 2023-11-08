const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const { MusicTag } = require('./MusicTag');
const Tag = require('./Tag');
const { Album } = require('./Album');
const { User } = require('../models/User');

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

Music.hasMany(Album);

const createProject = async (data) => {
  await Music.create(data);
};

const getAllMusic = async () => {
  return await Music.findAll({ raw: true });
};

const getMusic = async (id) => {
  return await Music.findOne({ where: { id: id }, raw: true });
};

module.exports = {
  Music,
  createProject,
  getAllMusic,
  getMusic,
};
