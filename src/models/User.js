const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const { Music } = require('./Music');
const { LikedMusic } = require('./LikedMusic');

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
});

User.belongsToMany(Music, {
  through: {
    model: LikedMusic,
  },
});

Music.belongsToMany(User, {
  through: {
    model: LikedMusic,
  },
});

Music.belongsTo(User);
User.hasMany(Music);

const createUser = async (data) => {
  await User.create(data);
};

const findUser = async (email) => {
  return User.findOne({ where: { email: email }, raw: true });
};

const findUserByPk = async (id) => {
  return User.findByPk(id, { raw: true });
};

const updateData = async (data, userId) => {
  return User.update(data, { where: { id: userId } });
};

const updatePassword = async (password, userId) => {
  await User.update({ password: password }, { where: { id: userId } });
};

module.exports = {
  User,
  createUser,
  findUser,
  updateData,
  findUserByPk,
  updatePassword,
};
