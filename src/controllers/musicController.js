const musicModel = require('../models/Music');
const userModel = require('../models/User');
const tagModel = require('../models/Tag');
const likedMusicModel = require('../models/LikedMusic');
const musicTagModel = require('../models/MusicTag');

const getPromoteProjectPage = async (req, res) => {
  const userData = req.session.userData;
  const userID = userData.id;
  const genrerTags = await tagModel.getGenrerTags();
  const subgenrerTags = await tagModel.getSubgenrerTags();
  const moodTags = await tagModel.getMoodTags();

  return res.render('promoteProject', {
    title: 'Promote Projects',
    userID,
    userData,
    genrerTags,
    subgenrerTags,
    moodTags,
  });
};

const getMusicPage = async (req, res) => {
  const userData = req.session.userData;
  const musicId = req.params.id;

  const music = await musicModel.getMusic(musicId);
  const link = music.link;

  res.clearCookie('type');
  res.clearCookie('musicId');
  res.cookie('musicId', link);
  res.cookie('type', music.type);

  if (userData) {
    const userId = userData.id;
    const likedMusic = await likedMusicModel.findMusicLiked(userId, musicId);

    return res.render('musicPage', {
      title: music.name,
      music: music.get({ plain: true }),
      userData,
      likedMusic,
    });
  } else {
    return res.render('musicPage', {
      title: music.name,
      music: music.get({ plain: true }),
      userData,
    });
  }
};

const likeMusic = async (req, res) => {
  const musicId = req.body.musicId;
  const userData = req.session.userData;
  const userId = userData.id;

  await likedMusicModel.setLikedMusic(userId, musicId);

  return res.redirect(`/music/${musicId}`);
};

const dislikeMusic = async (req, res) => {
  const musicId = req.body.musicId;
  const userData = req.session.userData;
  const userId = userData.id;

  await likedMusicModel.deleteLikedMusic(userId, musicId);

  return res.redirect(`/music/${musicId}`);
};

const postProjetc = async (req, res) => {
  const musicData = {
    name: req.body.name,
    type: req.body.type,
    link: req.body.link,
    link_photo: req.body.link_photo,
    qtdmsc: req.body.qtdmsc,
    artist: req.body.artist,
    userId: req.body.userId,
  };

  const musicTags = [
    req.body.genrerTag,
    req.body.subgenrerTag,
    req.body.moodTag,
  ];

  const music = await musicModel.createProject(musicData);

  await musicTagModel.postMusicTags(music, musicTags);

  return res.redirect('/');
};

const getResults = async (req, res) => {
  const userData = req.session.userData;

  const inputSearch = req.query.search;

  if (inputSearch == '') {
    return res.redirect('/');
  }

  const musics = await musicModel.searchMusic(inputSearch);

  return res.render('searchPage', {
    title: 'search',
    musics,
    inputSearch,
    userData,
  });
};

const getLibrary = async (req, res) => {
  const userData = req.session.userData;
  let musicsId = [];
  const userId = userData.id;

  const likedMusics = await likedMusicModel.getLikedMusics(userId);

  likedMusics.forEach((music) => {
    musicsId.push(music.musicId);
  });

  const musicsLibrary = await musicModel.getMusics(musicsId);

  return res.render('library', {
    userData,
    title: 'Library',
    library: musicsLibrary,
  });
};

const getHighlight = async (req, res) => {
  const userData = req.session.userData;
  const tracks = await musicModel.getAllTracks();
  return res.render('highlight', { userData, title: 'Highlights', tracks });
};

const getUserProjects = async (req, res) => {
  const userData = req.session.userData;
  const userId = userData.id;

  const userProjects = await musicModel.findUserProjects(userId);

  return res.render('profile-projects', {
    title: 'Projetos',
    userProjects,
    userData,
  });
};

module.exports = {
  getPromoteProjectPage,
  postProjetc,
  getLibrary,
  getHighlight,
  getResults,
  getMusicPage,
  likeMusic,
  dislikeMusic,
  getUserProjects,
};
