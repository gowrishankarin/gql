const axios = require('axios');

async function getGoogleProfile(access_token) {
  try {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        }
      }
    ).then(res => {
      return res;
    }).catch( err => {return err})
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports =  getGoogleProfile;