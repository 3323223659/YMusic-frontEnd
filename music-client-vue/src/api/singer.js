import request from '@/utils/request'

export function singerList() {
  return request({
    url: '/singer/list',
    method: 'get',
  })
}

export function singerPage(params) {
  return request({
    url: '/singer/page',
    method: 'get',
    params
  })
}