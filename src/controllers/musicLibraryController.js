const musicLibraryModel = require('../models/MusicLibrary');

const getLibrary = async (req, res) => {
  const userData = req.session.userData;
  return res.render('library', { userData, title: 'Library' });
};

module.exports = {
    getLibrary,
}
