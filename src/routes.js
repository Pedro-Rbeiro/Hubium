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

router.post('/register/create', userMiddlewares.valData, userMiddlewares.valUserEmail, userController.createUser);

router.get('/login/get', userMiddlewares.valData, userController.findUser);

router.get('/promote-projects', checkAuth, musicController.getPromoteProjectPage);

router.post('/promote-projects/post', musicMiddlewares.valMusic, musicController.postProjetc);

router.get('/music/:id', musicController.getMusicPage);

router.get('/highlights', musicController.getHighlight);

router.get('/library', musicController.getLibrary);

router.get('/results', musicController.getResults);

router.get('/profile-data', musicController.getProfile);

router.get('/profile-data/projects', (req, res) => {
  res.render('profile-projects', { title: 'Projetos' })
})
router.get('/profile-data/library', (req, res) => {
  res.render('profile-favorite', { title: 'Favoritos' })
})
// router.get('/music', (req, res) => {
//   res.clearCookie('musicId');
//   res.cookie('musicId', '5e8jwQEGvcKqs3edoWOvSv?si=dutcdDdAQhGf1GXxaNX1ZA');
//   const musicName = 'Most Wanted vol.1'; //Request music name from db
//   res.render('musicPage', { title: musicName });
// });

// router.get('/highlights', (req, res) => {
//   res.render('highlight', { title: 'Highlights' });
// });

// router.get('/library', (req, res) => {
//   res.render('library', { title: 'Library' });
// });

// router.get('/results', (req, res) => {
//   res.render('searchPage', { title: 'search' });
// });

// router.get('/profile', (req, res) => {
//   res.render('profile', { title: 'Profile', });
// })

// router.get('/promote-projects', (req, res) => {
//   res.render('promoteProject', { title: 'Promote Projects' })
// })
module.exports = router;
