window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
    uri: 'spotify:album:4I2o6s3EGpcIg64kQ1T75O'
  };
  const callback = (EmbedController) => {
    console.log(EmbedController)
  };
  IFrameAPI.createController(element, options, callback)

};
