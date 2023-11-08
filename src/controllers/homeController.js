const userModel = require('../models/User');
const musicModel = require('../models/Music');
const likedMusicModel = require('../models/LikedMusic');
const musicLibrary = require('../models/MusicLibrary');

const home = async (req, res) => {
  const userData = req.session.userData;

  const musics = await musicModel.getAllMusic();

  console.log(musics);

  if (req.session.user) {
    return res.render('home', {
      title: 'Inicio',
      user: true,
      userData,
      musics,
    });
  } else {
    return res.render('home', { title: 'Inicio', user: false, musics });
  }
};

const termsnconditionsPage = (req, res) => {
  return res.render('termsnconditions', { title: 'Termos e condições' });
};

module.exports = {
  home,
  termsnconditionsPage,
};
