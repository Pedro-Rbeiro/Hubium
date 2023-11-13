function validadeName(name) {
  if (!name.match(/[a-zA-Z]{2,}/)) {
    const err = new Error(`O nome precisa ter mais de 2 caracteres`)
    err.input = 'name'
    throw err
  }
}
function validateEmail(email) {
  if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
    const err = new Error(`Email Invalido.`)
    err.input = 'email'
    throw err
  }
}

function validatePassword(password) {
  if (
    password.length < 8 ||
    !password.match(/[a-z]/) ||
    !password.match(/[A-Z]/) ||
    !password.match(/\d/) ||
    !password.match(/[^a-zA-Z0-9\s]/)
  ) {
    const err = new Error(`Sua senha precisa ter pelo menos 8 caracteres sendo eles uma letra maiuscula, um numero e um caractere especial Ex:"@, !, #, $, %, &, *"`)
    err.input = 'password'
    throw err
  }
}

function resetFormStyles(inputs) {
  Object.entries(inputs).forEach(([key, value]) => {
    value.classList.remove('success', 'error')
    document.querySelector(`#${key}-error`).textContent = ''
  })
}

const userInputs = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
  password: document.querySelector('#password')
}

const form = document.querySelectorAll('.registerInput')
form.forEach((e) => {
  e.addEventListener('keydown', (e) => {

    resetFormStyles(userInputs)
    try {
      validadeName(userInputs.name.value)
      userInputs.name.classList.add('success')
      validateEmail(userInputs.email.value)
      userInputs.email.classList.add('success')
      validatePassword(userInputs.password.value)
      userInputs.password.classList.add('success')
      document.getElementById('create-btn').disabled = false
    } catch (err) {
      console.log(err);
      userInputs[err.input].classList.add('error')
      document.querySelector(`#${err.input}-error`).textContent = err.message
    }
  })
});