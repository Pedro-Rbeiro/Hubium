const { hash, compare } = require('bcrypt');
const userModel = require('../models/User');

const registerPage = (_req, res) => {
  return res.render('register', { title: 'Cadastro', layout: 'min-header' });
};

const createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await hash(req.body.password, 7);

  const userData = {
    name,
    email,
    password,
  };

  await userModel.createUser(userData);

  return res.status(201).redirect('/login');
};

const loginPage = (_req, res) => {
  res.render('login', { title: 'Login', layout: 'min-header' });
};

const findUser = async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  const user = await userModel.findUser(email);

  compare(password, user.password, (err, results) => {
    if (results) {
      req.session.userData = user;
      return req.session.save(() => {
        res.redirect('/');
      });
    } else {
      return res.status(200).send({ mensage: 'Usuário não encotrado' });
    }
  });
};

module.exports = {
  registerPage,
  createUser,
  loginPage,
  findUser,
};
