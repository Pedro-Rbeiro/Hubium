const musicModel = require('../models/Music');
const userModel = require('../models/User');
const tagModel = require('../models/Tag');
const likedMusicModel = require('../models/LikedMusic');
const musicTagModel = require('../models/MusicTag');
const { Tag } = require('../models/Tag');
const { Music } = require('../models/Music');

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
  if (userData) {
    const userId = userData.id;
    const musicId = req.params.id;
    const likedMusic = await likedMusicModel.findMusicLiked(userId, musicId);
    const music = await musicModel.getMusic(musicId);
    const link = music.link;
    res.clearCookie('type');
    res.clearCookie('musicId');
    res.cookie('musicId', link);
    res.cookie('type', music.type);

    return res.render('musicPage', {
      title: music.name,
      music: music.get({ plain: true }),
      userData,
      likedMusic,
    });
  } else {
    const musicId = req.params.id;
    const music = await musicModel.getMusic(musicId);
    const link = music.link;
    res.clearCookie('type');
    res.clearCookie('musicId');
    res.cookie('musicId', link);
    res.cookie('type', music.type);

    return res.render('musicPage', {
      title: music.name,
      music: music.get({ plain: true }),
      userData,
    });
  }
  // res.clearCookie('type');
  // res.clearCookie('musicId');
  // res.cookie('musicId', link);
  // res.cookie('type', music.type);

  // return res.render('musicPage', {
  //   title: music.name,
  //   music: music.get({ plain: true }),
  //   userData,
  //   likedMusic,
  // });
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
  return res.render('library', { userData, title: 'Library' });
};

const getHighlight = async (req, res) => {
  const userData = req.session.userData;
  return res.render('highlight', { userData, title: 'Highlights' });
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
};
