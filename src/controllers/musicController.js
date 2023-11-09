const musicModel = require('../models/Music');
const userModel = require('../models/User');
const tagModel = require('../models/Tag');
const musicTagModel = require('../models/MusicTag');

const getMusicPage = async (req, res) => {
  //TODO: adicionar data de expiração
  const userData = req.session.userData;
  const idMusic = req.params.id;
  const music = await musicModel.getMusic(idMusic);
  const link = music.link.slice(1);
  res.clearCookie('musicId');
  res.cookie('musicId', link); // Link da musica deve retornar sem o '/'
  res.render('musicPage', { title: music.name, music });
};

const getPromoteProjectPage = async (req, res) => {
  const userID = req.params.id;
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

  await musicModel.createProject(musicData);

  const musicId = await musicModel.getMusicId(req.body.name);

  await musicTagModel.postMusicTags(musicId, musicTags);
  
  return res.redirect('/');
};

const getLibrary = async (req, res) => {
  const userData = req.session.userData;
  return res.render('library', { userData, title: 'Library' });
};

const getHighlight = async (req, res) => {
  const userData = req.session.userData;
  return res.render('highlight', { userData, title: 'Highlights' });
};

const getResults = async (req, res) => {
  const userData = req.session.userData;
  return res.render('searchPage', { userData, title: 'search' });
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
