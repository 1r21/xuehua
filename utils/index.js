const BASE_URL = 'http://localhost:8000'

export function request({ url, method = 'GET', data, }) {
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: `${BASE_URL}/${url}`,
      method,
      data,
      dataType: 'json',
      success(res) {
        resolve(res.data)
      },
      fail(res) {
        reject(res)
      },
    });
  })
}
