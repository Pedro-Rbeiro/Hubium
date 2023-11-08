const client_id = "49c6bae8cfe24d80ae1610dde2b15900";
const client_secret = "ce3599cbc81a4b3fa13e7e62f65c7226";
document.querySelector('input[name="link"]').addEventListener("blur", () => {
  let token = "";

  async function getToken() {
    const url = `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    token = data.access_token;
    return token;
  }
  getToken().then(async () => {
    const uri = document.querySelector('input[name="link"]').value;
    const type = document.querySelector('select[name="type"]').value;
    const url = `https://api.spotify.com/v1/${type}${uri}`;

    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options)
    if (!response.ok) {
      document.getElementById("subimit-btn").disabled = true;
      document.querySelector('input[name="link"]').classList.add('error')
      return;
    } else {
      const data = await response.json();

      document.querySelector('input[name="link"]').classList.remove('error')
      document.getElementById("subimit-btn").disabled = false;

      document.querySelector('input[name="link_photo"]').value = data.images[1].url;

      document.querySelector('input[name="qtdmsc"]').value = data.total_tracks;
      
      return 
    }
  });
});
