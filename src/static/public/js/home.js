// Preloader
window.onload = () => {
  const loadingScreen = document.getElementById('loading')
  setTimeout(() => {
    loadingScreen.classList.add('loaded')

    setTimeout(() => {
      document.getElementById('section-flex').removeChild(loadingScreen)
    }, 2000);
  }, 3000);
}

const colors = [
  "#FFFFFF",
  "#8F00FF",
];

const squares = document.querySelectorAll(".Preloader-square");
const tl = new TimelineMax({ onComplete: Test });

const anim = () => {
  tl.staggerFromTo(squares, 0.8,
    {
      height: 0,
    },
    {
      cycle: {
        backgroundColor() {
          return colors[Math.floor(Math.random() * colors.length)];
        },
        height() {
          return (Math.random() * 40) + 10;
        }
      },
      autoAlpha: 1,
      ease: Expo.easeInOut,
    },
    0.4,
  );
  tl.staggerTo(squares, 0.7, { autoAlpha: 0, height: 0, ease: Expo.easeInOut }, 0.4, "-=0.5");
  console.log(tl);
};

function Test() {
  tl.invalidate();
  anim();
};


// Hamburger nav 
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


