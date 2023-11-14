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

  return res.redirect('/login');
};

const loginPage = (_req, res) => {
  res.render('login', { title: 'Login', layout: 'min-header' });
};

const findUser = async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  const user = await userModel.findUser(email);

  if (user) {
    compare(password, user.password, (err, results) => {
      if (results) {
        req.session.userData = user;
        return req.session.save(() => {
          res.redirect('/');
        });
      } else {
        return res.send({ mensage: 'Senha incorreta' });
      }
    });
  } else {
    return res.send({ mensage: 'Usuário não encontrado' });
  }
};

module.exports = {
  registerPage,
  createUser,
  loginPage,
  findUser,
};
