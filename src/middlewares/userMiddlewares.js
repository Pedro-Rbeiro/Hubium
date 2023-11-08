const userModel = require('../models/User');

const valData = (req, res, next) => {
  const registerName = req.body.name;
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;

  const email = req.query.email;
  const password = req.query.password;

  if (registerName == '' || registerEmail == '' || registerPassword == '') {
    return res
      .status(400)
      .send({ mensage: 'preencha todos os dados para o cadastro' });
  }

  if (email == '' || password == '') {
    return res
      .status(400)
      .send({ mensage: 'preencha todos os dados para o login' });
  }

  next();
};

const valUserEmail = async (req, res, next) => {
  const emailForm = req.body.email;

  const userEmail = await userModel.findUser(emailForm);

  if (userEmail) {
    return res.send({mensage: "Usuário já cadastrado com este email"});
  } else {
    next();
  }
}

module.exports = {
  valData,
  valUserEmail
};
