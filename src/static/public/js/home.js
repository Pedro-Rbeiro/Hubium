const hamburgerNav = document.getElementById('hamburger-nav')
const hamburger = document.getElementById("hamburger-icon")
hamburger.addEventListener('click', () => {

  if (hamburgerNav.classList.contains('deactivated')) {
    hamburgerNav.classList.remove('deactivated')
    hamburgerNav.classList.add('active')
  } else {
    hamburgerNav.classList.remove('active')
    hamburgerNav.classList.add('deactivated')
  }

})