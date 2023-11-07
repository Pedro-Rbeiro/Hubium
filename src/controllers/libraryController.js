const getLibrary = async (req, res) => {
  const userData = req.session.userData;
  return res.render("library", { userData });
};

module.exports = {
  getLibrary,
};
