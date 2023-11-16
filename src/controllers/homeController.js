const userModel = require('../models/User');
const musicModel = require('../models/Music');
const likedMusicModel = require('../models/LikedMusic');

const home = async (req, res) => {
  const userData = req.session.userData;
  // const userid = userData.id;

  const albums = await musicModel.getAllAlbums();
  const tracks = await musicModel.getAllTracks();
  // const likedMusics = await likedMusicModel.(userid);

  if (userData) {
    return res.render('home', {
      title: 'Inicio',
      userData,
      albums,
      tracks,
      // library,
    });
  } else {
    return res.render('home', {
      title: 'Inicio',
      albums,
      tracks,
      // library: likedMusics.get({ plain: true }),
    });
  }
};

const termsnconditionsPage = (req, res) => {
  const userData = req.session.userData;
  return res.render('termsnconditions', {
    title: 'Termos e condições',
    userData,
  });
};

module.exports = {
  home,
  termsnconditionsPage,
};
