import { request } from '../utils/index'

export async function getTexts() {
  return request({
    url: '/api/news'
  })
}

export async function getTextById(id) {
  return request({
    url: '/api/news/detail',
    method: 'POST',
    data: {
      id
    }
  })
}