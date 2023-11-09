const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const Tag = db.define('tag', {
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
});

// Tag.create({
//   name: "+18",
//   type: "mood"
// })

const getGenrerTags = async () => {
  return await Tag.findAll({ where: { type: 'genrer' }, raw: true });
};

const getSubgenrerTags = async () => {
  return await Tag.findAll({ where: { type: 'subgenrer' }, raw: true });
};

const getMoodTags = async () => {
  return await Tag.findAll({ where: { type: 'mood' }, raw: true });
};

module.exports = {
  Tag,
  getGenrerTags,
  getSubgenrerTags,
  getMoodTags,
};
