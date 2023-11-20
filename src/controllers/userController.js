const { hash, compare } = require('bcrypt');

const userModel = require('../models/User');
const likedMusicModel = require('../models/LikedMusic');
const musicModel = require('../models/Music');

const registerPage = (_req, res) => {
  return res.render('register', { title: 'Cadastro', layout: 'min-header' });
};

const createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await hash(req.body.password, 7);

  const userData = {
    name,
    email,
    password,
  };

  await userModel.createUser(userData);

  return res.redirect('/login');
};

const loginPage = (_req, res) => {
  res.render('login', { title: 'Login', layout: 'min-header' });
};

const findUser = async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  const user = await userModel.findUser(email);

  if (user) {
    compare(password, user.password, (err, results) => {
      if (results) {
        req.session.userData = user;
        return req.session.save(() => {
          res.redirect('/');
        });
      } else {
        return res.send(
          `<script>alert("Senha incorreta"); document.location.href = "/login" </script>`
        );
      }
    });
  } else {
    return res.send(
      `<script>alert("Usuario não encontrado"); document.location.href = "/login" </script>`
    );
  }
};

const logout = (req, res) => {
  req.session.destroy();

  return res.redirect('/');
};

const getProfileData = async (req, res) => {
  const userData = req.session.userData;
  return res.render('profile', { userData, title: 'Profile' });
};

const updateProfileData = async (req, res) => {
  const userData = req.session.userData;
  const userId = userData.id;
  const name = req.body.name;
  const email = req.body.email;

  const data = { name, email };

  await userModel.updateData(data, userId);

  const updatedData = await userModel.findUser(email);

  req.session.userData = updatedData;

  return res.redirect('/');
};

const getLikedMusics = async (req, res) => {
  const userData = req.session.userData;
  const userId = userData.id;
  let musicsId = [];

  const likedMusics = await likedMusicModel.getLikedMusics(userId);

  likedMusics.forEach((music) => {
    musicsId.push(music.musicId);
  });

  const musicsLibrary = await musicModel.getMusics(musicsId);

  res.render('profile-favorite', {
    title: 'Favoritos',
    userData,
    library: musicsLibrary,
  });
};

const changePasswordPage = async (req, res) => {
  const userData = req.session.userData;

  return res.render('forgor-password', { title: 'Esqueceu a senha' });
};

const changePassword = async (req, res) => {
  const email = req.body.email;
  const password = await hash(req.body.password, 7);

  const user = await userModel.findUser(email);

  if (user) {
    await userModel.updatePassword(password, user.id);
    return res.redirect('/login');
  } else {
    return res.send(
      `<script>alert("Usuario não encontrado"); document.location.href = "/login" </script>`
    );
  }
};

module.exports = {
  registerPage,
  createUser,
  loginPage,
  findUser,
  logout,
  getProfileData,
  updateProfileData,
  getLikedMusics,
  changePasswordPage,
  changePassword,
};
