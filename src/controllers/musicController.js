const musicController = require('../models/Music');
const userModel = require('../models/User');

const getPromoteProjectPage = async (req, res) => {
  const userID = req.params.id;
  return res.render('promoteProject', { title: 'Promote Projects', userID });
};

module.exports = {
	getPromoteProjectPage,
}
