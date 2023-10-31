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

module.exports = {
  valData,
};
