const musicModel = require('../models/Music');
const userModel = require('../models/User');

const getMusicPage = async (req, res) => { //TODO: adicionar data de expiração
  const userData = req.session.userData;
  const idMusic = req.params.id;
  const music = await musicModel.getMusic(idMusic);
  const link = music.link.slice(1);
  res.clearCookie('musicId');
  res.cookie('musicId', link); // Link da musica deve retornar sem o '/'
  res.render('musicPage', { title: music.name, music })
}

const getPromoteProjectPage = async (req, res) => {
  const userID = req.params.id;
  return res.render('promoteProject', { title: 'Promote Projects', userID });
};

const postProjetc = async (req, res) => {
  const linkForm = req.body.link;

  const music = await musicModel.findMusicLink(linkForm);

  if (music) {
    return res.send({ mensage: 'Música já cadastrada no sistema' });
  } else {
    await musicModel.createProject(req.body);
    return res.redirect('/');
  }
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
