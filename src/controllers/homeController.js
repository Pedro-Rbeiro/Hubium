const userModel = require('../models/User');

const home = async (req, res) => {
  const userData = req.session.userData;
  if (req.session.user) {
    return res.render('home', { title: 'Inicio', user: true , userData });
  } else {
    return res.render('home', { title: 'Inicio', user: false });
  }
};

module.exports = {
  home,
};
