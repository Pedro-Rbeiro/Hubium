const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController.js');
const musicController = require('./controllers/musicController.js');
const musicMiddlewares = require('./middlewares/musicMiddlewares.js');
const userMiddlewares = require('./middlewares/userMiddlewares.js');
const homeController = require('./controllers/homeController.js');
const checkAuth = require('./Helpers/auth.js');

router.get('/', homeController.home);

router.get('/register', userController.registerPage);

router.get('/login', userController.loginPage);

router.post(
  '/register/create',
  userMiddlewares.valData,
  userMiddlewares.valUserEmail,
  userController.createUser
);

router.get('/login/get', userMiddlewares.valData, userController.findUser);

router.get(
  '/promote-projects',
  checkAuth,
  musicController.getPromoteProjectPage
);

router.post(
  '/promote-projects/post',
  musicMiddlewares.valMusic,
  musicController.postProjetc
);

router.get('/music/:id', musicController.getMusicPage);

router.get('/highlights', musicController.getHighlight);

router.get('/library', musicController.getLibrary);

router.get('/results', musicController.getResults);

router.get('/profile-data', userController.getProfileData);

router.post('/profile-data/update', userController.updateProfileData);

router.get('/profile-data/projects', (req, res) => {
  res.render('profile-projects', { title: 'Projetos' });
});
router.get('/profile-data/library', (req, res) => {
  res.render('profile-favorite', { title: 'Favoritos' });
});

router.get('/logout', userController.logout);

router.get('/termsnconditions', homeController.termsnconditionsPage);

module.exports = router;
