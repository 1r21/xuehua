import config from '../config'
const { API_URL } = config;

export function request({ url, method = 'GET', data, }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_URL}${url}`,
      method,
      data,
      dataType: 'json',
      success(res) {
        const { code, message, data } = res.data
        if (code === 0) {
          resolve(data)
        } else {
          reject(message)
        }
      },
      fail(res) {
        reject(res)
      },
    });
  })
}
