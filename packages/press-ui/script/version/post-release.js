const axios = require('axios');

function main() {
  axios({
    method: 'POST',
    url: 'https://a.com/pipelines/7fc6e8ff3b2b4c7697f361b3eba75ca8/build',
    headers: {
      'X-DEVOPS-PROJECT-ID': 'tip-h5',
      'X-DEVOPS-UID': 'guowangyang',
    },
    data: {},
  }).then((res) => {
    console.log('[Post Release] res:', res.data);
  })
    .catch((err) => {
      console.log('[Post Release] err:', err);
    });
}

main();
