const helpBtn = document.getElementById('help-btn')
const closeModal = document.getElementById('close-modal')
const helpModal = document.getElementById('help-modal')

helpBtn.addEventListener('click', () => {
  helpModal.classList.remove('hidden')
  helpModal.classList.add('shown')
})
closeModal.addEventListener('click', () => {
  helpModal.classList.remove('shown')
  helpModal.classList.add('hidden')
})