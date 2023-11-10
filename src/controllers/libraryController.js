const getLibrary = async (req, res) => {
  return res.render("library", { userData });
};

module.exports = {
  getLibrary,
};
