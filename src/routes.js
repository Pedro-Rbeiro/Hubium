const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController.js');
const userMiddlewares = require('./middlewares/userMiddlewares.js');

router.get('/', (req, res) => {
  res.render('home', { title: 'Inicio' });
});

router.get('/register', userController.registerPage);

router.get('/login', userController.loginPage);

router.post('/register/create', userMiddlewares.valData, userController.createUser);

router.get('/login/get', userMiddlewares.valData, userController.findUser);

router.get('/music', (req, res) => {
  res.clearCookie('musicId');
  res.cookie('musicId', '5e8jwQEGvcKqs3edoWOvSv?si=dutcdDdAQhGf1GXxaNX1ZA');
  const musicName = 'Most Wanted vol.1'; //Request music name from db
  res.render('musicPage', { title: musicName });
});

router.get('/results', (req, res) => {
  res.render('searchPage', { title: 'search' });
});

router.get('/highlights', (req, res) => {
  res.render('highlight', { title: 'Highlights' });
});
router.get('/library', (req, res) => {
  res.render('library', { title: 'Library' });
});

module.exports = router;