import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/user/page',
    method: 'get',
    params
  })
}

export function userCount() {
  return request({
    url: '/user/count',
    method: 'get',
  })
}