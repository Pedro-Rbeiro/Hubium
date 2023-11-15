function validadeName(name) {
  if (!name.match(/[a-zA-Z]{2,}/) ||
    name.length >= 10) {
    const err = new Error(`O nome precisa ter mais de 2 caracteres e menos que 10 caracteres`)
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


function resetFormStyles(inputs) {
  Object.entries(inputs).forEach(([key, value]) => {
    value.classList.remove('success', 'error')
  })
}

const userInputs = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
}

const form = document.querySelectorAll('.registerInput')
form.forEach((e) => {
  e.addEventListener('change', (e) => {
    resetFormStyles(userInputs)
    try {
      validadeName(userInputs.name.value)
      userInputs.name.classList.add('success')
      validateEmail(userInputs.email.value)
      userInputs.email.classList.add('success')
      document.getElementById('create-btn').disabled = false
    } catch (err) {
      document.getElementById('create-btn').disabled = true
      userInputs[err.input].classList.add('error')

    }
  })
});
document.getElementById('cancel-btn').addEventListener('click', (e) => {
  e.preventDefault()
  window.location.reload()
})