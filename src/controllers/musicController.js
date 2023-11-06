const musicController = require("../models/Music");
const userModel = require("../models/User");

const getPromoteProjectPage = async (req, res) => {
  const userID = req.params.id;
  return res.render("promoteProject", { title: "Promote Projects", userID });
};

const postProjetc = async (req, res) => {
  console.log(req.body);
  await musicController.createProject(req.body);
  return res.redirect('/');
};

module.exports = {
  getPromoteProjectPage,
  postProjetc,
};
