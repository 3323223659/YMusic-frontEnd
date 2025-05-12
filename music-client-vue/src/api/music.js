import request from '@/utils/request'

export function musicPage(params) {
  return request({
    url: '/music/page',
    method: 'get',
    params
  })
}

export function toCollect(id) {
  return request({
    url: `/music/${id}`,
    method: 'post',
  })
}

export function collection() {
  return request({
    url: '/music/collection',
    method: 'get',
  })
}

export function removeCollection(id) {
  return request({
    url: `/music/${id}`,
    method: 'delete',
  })
}

export function musicList(params) {
  return request({
    url: '/music/list',
    method: 'get',
    params
  })
}