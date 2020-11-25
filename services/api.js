import { request } from '../utils/index'

export async function getAudios() {
  return request({
    url: '/api/news', 
    method: 'POST'
  })
}