const musicModel = require('../models/Music');

const valMusic = async (req, res, next) => {
  const linkForm = req.body.link;

  const music = await musicModel.findMusicLink(linkForm);

  if (music) {
    return res.send({ mensage: 'Música já cadastrada no sistema' });
  } else {
    next();
  }
};

module.exports = {
  valMusic,
};
