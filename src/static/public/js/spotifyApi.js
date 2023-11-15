let musicId = document.cookie;
let type = document.cookie;

musicId = JSON.stringify(musicId);
musicId = JSON.parse(musicId);
musicId = decodeURIComponent(musicId);

musicId = musicId.replace(/;/, '');
musicId = musicId.match(/(?<==).\S+/g);

type = musicId[1];
type = type.slice(0, -1);
musicId = musicId[0];

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('embed-iframe');
  const options = {
    uri: `spotify:${type}:${musicId}`,
  };
  const callback = (EmbedController) => {
    console.log(EmbedController);
  };
  IFrameAPI.createController(element, options, callback);

};
