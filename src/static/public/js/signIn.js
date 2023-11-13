function validateEmail(email) {
  if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
    const err = new Error(`Email Invalido.`)
    err.input = 'email'
    throw err
  }
}

function validatePassword(password) {
  if (
    password.length < 8) {
    const err = new Error(`Sua senha precisa ter pelo menos 8 caracteres`)
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
  email: document.querySelector('#email'),
  password: document.querySelector('#password')
}

const form = document.querySelectorAll('.registerInput')
form.forEach((e) => {
  e.addEventListener('keydown', (e) => {
    resetFormStyles(userInputs)
    try {
      validateEmail(userInputs.email.value)
      userInputs.email.classList.add('success')
      validatePassword(userInputs.password.value)
      userInputs.password.classList.add('success')
      document.getElementById('create-btn').disabled = false
    } catch (err) {
      console.log(err);
      document.getElementById('create-btn').disabled = true
      userInputs[err.input].classList.add('error')
      document.querySelector(`#${err.input}-error`).textContent = err.message
    }
  })
});