const db = require('../db/conn');
const { DataTypes, where } = require('sequelize');

const { Music } = require('./Music');
const { MusicLibrary } = require('./MusicLibrary');
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
    model: MusicLibrary,
  },
});

Music.belongsToMany(User, {
  through: {
    model: MusicLibrary,
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

const updateData = async(data, userId) => {
  return User.update(data, {where: {id: userId}});
}

module.exports = {
  User,
  createUser,
  findUser,
  updateData,
};
