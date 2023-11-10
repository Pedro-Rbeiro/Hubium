const musicLibraryModel = require('../models/MusicLibrary');

const getLibrary = async (req, res) => {
  return res.render('library', { userData, title: 'Library' });
};

module.exports = {
    getLibrary,
}
