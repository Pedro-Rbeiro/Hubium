const userModel = require('../models/User');

const valData = (req, res, next) => {
  const registerName = req.body.name;
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;

  const loginEmail = req.query.email;
  const loginPassword = req.query.password;

  const changeEmail = req.body.email;
  const changePassword = req.body.password;

  if (registerName == '' || registerEmail == '' || registerPassword == '') {
    return res
      .status(400)
      .send(
        `<script>alert("Preencha todos os dados para realizar o cadastro"); document.location.href = "/register" </script>`
      );
  }

  if (loginEmail == '' || loginPassword == '') {
    return res
      .status(400)
      .send(
        `<script>alert("preencha todos os dados para realizar o login"); document.location.href = "/login" </script>`
      );
  }

  if (changeEmail == '' || changePassword == '') {
    return res
      .status(400)
      .send(
        `<script>alert("preencha todos os dados"); document.location.href = "/forgor-password" </script>`
      );
  }

  next();
};

const valUserEmail = async (req, res, next) => {
  const emailForm = req.body.email;

  const userEmail = await userModel.findUser(emailForm);

  if (userEmail) {
    return res.send(
      `<script>alert("Usuario já cadastrado com esse email"); document.location.replace("/register")</script>`
    );
  } else {
    next();
  }
};

module.exports = {
  valData,
  valUserEmail,
};
