const checkAuth = (req, res, next) => {
  const userData = req.session.userData;
  if (!userData) {
    return res.redirect('/login');
  } else {
    next();
  }
};

module.exports = checkAuth;