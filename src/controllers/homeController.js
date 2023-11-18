const userModel = require('../models/User');
const musicModel = require('../models/Music');
const likedMusicModel = require('../models/LikedMusic');
const { LikedMusic } = require('../models/LikedMusic');

const home = async (req, res) => {
  const userData = req.session.userData;

  const albums = await musicModel.getAllAlbums();
  const tracks = await musicModel.getAllTracks();

  if (userData) {
    let musicsId = [];
    const userId = userData.id;

    const likedMusics = await likedMusicModel.getLikedMusics(userId);

    likedMusics.forEach((music) => {
      musicsId.push(music.musicId);
    });

    const musicsLibrary = await musicModel.getMusics(musicsId);

    return res.render('home', {
      title: 'Inicio',
      userData,
      albums,
      tracks,
      library: musicsLibrary,
    });
  } else {
    return res.render('home', {
      title: 'Inicio',
      albums,
      tracks,
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
