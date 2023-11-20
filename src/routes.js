const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController.js');
const musicController = require('./controllers/musicController.js');
const musicMiddlewares = require('./middlewares/musicMiddlewares.js');
const userMiddlewares = require('./middlewares/userMiddlewares.js');
const homeController = require('./controllers/homeController.js');
const checkAuth = require('./Helpers/auth.js');

//home routes

router.get('/', homeController.home);

router.get('/termsnconditions', homeController.termsnconditionsPage);

//user routes

router.get('/register', userController.registerPage);

router.get('/login', userController.loginPage);

router.get('/login/get', userMiddlewares.valData, userController.findUser);

router.get('/forgor-password', userController.changePasswordPage);

router.get('/profile-data', checkAuth, userController.getProfileData);

router.get('/profile-data/library', checkAuth, userController.getLikedMusics);

router.get('/logout', userController.logout);

router.post(
  '/forgor-password/post',
  userMiddlewares.valData,
  userController.changePassword
);

router.post(
  '/register/create',
  userMiddlewares.valData,
  userMiddlewares.valUserEmail,
  userController.createUser
);

router.post(
  '/profile-data/update',
  checkAuth,
  userController.updateProfileData
);

//music routes

router.get(
  '/promote-projects',
  checkAuth,
  musicController.getPromoteProjectPage
);

router.get('/highlights', musicController.getHighlight);

router.get('/library', checkAuth, musicController.getLibrary);

router.get('/results', musicController.getResults);

router.get('/music/:id', musicController.getMusicPage);

router.get(
  '/profile-data/projects',
  checkAuth,
  musicController.getUserProjects
);

router.post(
  '/promote-projects/post',
  musicMiddlewares.valMusic,
  musicController.postProjetc
);

router.post('/music/like', checkAuth, musicController.likeMusic);

router.post('/music/dislike', checkAuth, musicController.dislikeMusic);

//non existent routes

router.get('*', (req, res) => {
  res.status(404).render('404', { title: 'Pagina não encontrada!' });
});

module.exports = router;
