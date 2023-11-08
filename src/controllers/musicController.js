const musicModel = require('../models/Music');
const userModel = require('../models/User');

const getMusicPage = async (req, res) => { //TODO: adicionar data de expiração
  const idMusic = req.params.id;
  const music = await musicModel.getMusic(idMusic);
  res.clearCookie('musicId');
  res.cookie('musicId', music.link); // Link da musica deve retornar sem o '/'
  const musicName = 'Most Wanted vol.1'; //Request music name from db
  res.render('musicPage', { title: music.name })
}

const getPromoteProjectPage = async (req, res) => {
  const userID = req.params.id;
  return res.render('promoteProject', { title: 'Promote Projects', userID });
};

const postProjetc = async (req, res) => {
  console.log(req.body);
  await musicModel.createProject(req.body);
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
