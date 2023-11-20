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
      .send(`<script>alert("Preencha todos os dados"); document.location.href = "/register" </script>`);
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
    return res.send(`<script>alert("Usuario já cadastrado com esse email"); document.location.replace("/register")</script>`);
  } else {
    next();
  }
}

module.exports = {
  valData,
  valUserEmail
};
