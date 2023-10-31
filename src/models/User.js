const db = require('../db/conn');
const { DataTypes } = require('sequelize');

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

const createUser = async (data) => {
  await User.create(data);
};

const findUser = async (email) => {
  return User.findOne({ where: { email: email }, raw: true });
};

module.exports = {
  createUser,
  findUser,
};
