const fac = new FastAverageColor();
const container = document.querySelector('.music-container');
const header = document.querySelector('header');
const imgLink = document.querySelector('.album-cover').currentSrc

fac.getColorAsync(imgLink, {
  ignoredColor: [255, 255, 255, 255],
  ignoredColor: [0, 0, 0, 0]
})
  .then(color => {
    header.style.backgroundColor = color.rgba
    container.style.backgroundColor = color.rgba;
    container.style.color = color.isDark ? '#fff' : '#000';
    if (color.isLight) {
      document.documentElement.style.setProperty('--first-color', '#333333')
      document.documentElement.style.setProperty('--third-color', '#333333')
      document.documentElement.style.setProperty('--fourth-color', '#FFFFFF')
      document.documentElement.style.setProperty('--transparent-bg', '#00000015')
    }
    console.log('Average color', color);
  })
  .catch(e => {
    console.log(e);
  });
