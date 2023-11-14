const userModel = require('../models/User');
const musicModel = require('../models/Music');
const likedMusicModel = require('../models/LikedMusic');
const musicLibrary = require('../models/MusicLibrary');

const home = async (req, res) => {
  const userData = req.session.userData;

  const albums = await musicModel.getAllAlbums();
  const tracks = await musicModel.getAllTracks();
  const musics = await musicModel.getAllMusics();

  if (userData) {
    return res.render('home', {
      title: 'Inicio',
      userData,
      albums,
      tracks,
      musics,
    });
  } else {
    return res.render('home', { title: 'Inicio', albums, tracks, musics });
  }
};

const termsnconditionsPage = (req, res) => {
  const userData = req.session.userData;
  return res.render('termsnconditions', { title: 'Termos e condições', userData });
};

module.exports = {
  home,
  termsnconditionsPage,
};
