const musicModel = require('../models/Music');
const userModel = require('../models/User');
const tagModel = require('../models/Tag');
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
    genrerTags,
    subgenrerTags,
    moodTags,
  });
};

const getMusicPage = async (req, res) => {
  const musicId = req.params.id;
  const music = await musicModel.getMusic(musicId);
  const link = music.link.slice(1);
  res.clearCookie('type');
  res.clearCookie('musicId');
  res.cookie('musicId', link); // Link da musica deve retornar sem o '/'
  res.cookie('type', music.type);
  res.render('musicPage', {
    title: music.name,
    music: music.get({ plain: true }),
  });
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
  const inputSearch = req.query.search;

  const musics = await musicModel.searchMusic(inputSearch);

  return res.render('searchPage', { title: 'search', musics, inputSearch });
};

const getLibrary = async (req, res) => {
  const userData = req.session.userData;
  return res.render('library', { userData, title: 'Library' });
};

const getHighlight = async (req, res) => {
  const userData = req.session.userData;
  return res.render('highlight', { userData, title: 'Highlights' });
};

const getProfile = async (req, res) => {
  const userData = req.session.userData;
  return res.render('profile', { userData, title: 'Profile' });
};

module.exports = {
  getPromoteProjectPage,
  postProjetc,
  getLibrary,
  getHighlight,
  getResults,
  getProfile,
  getMusicPage,
};
