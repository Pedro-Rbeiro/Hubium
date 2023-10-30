let musicId = document.cookie.split(`; `)
musicId = musicId[0].split('=').pop()
musicId = JSON.stringify(musicId)
musicId = JSON.parse(musicId)
musicId = decodeURIComponent(musicId)

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
    uri: `spotify:album:${musicId}`
  };
  const callback = (EmbedController) => {
    console.log(EmbedController)
  };
  IFrameAPI.createController(element, options, callback)

};
