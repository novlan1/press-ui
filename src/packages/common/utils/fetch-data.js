import { isNotInUni } from './utils';


export function fetchData(url) {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    if (isNotInUni()) {
      fetch(url).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return {};
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });

      return;
    }
    // #endif
    uni.request({
      url,
      data: {},
      method: 'GET',
      sslVerify: true,
      success: ({ data }) => {
        resolve(data);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}
