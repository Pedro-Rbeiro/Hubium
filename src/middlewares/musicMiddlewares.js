const musicModel = require('../models/Music');

const valMusic = async (req, res, next) => {
  const linkForm = req.body.link;

  const music = await musicModel.findMusicLink(linkForm);

  if (music) {
    return res.send(`<script>alert("Musica já cadastrada no sistema"); document.location.href = "/promote-projects" </script>`);
  } else {
    next();
  }
};

module.exports = {
  valMusic,
};
