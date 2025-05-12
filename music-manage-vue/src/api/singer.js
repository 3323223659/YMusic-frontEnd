import request from '@/utils/request'

export function singerCount() {
  return request({
    url: '/singer/count',
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

export function deleteSinger(id) {
  return request({
    url: `/singer/${id}`,
    method: 'delete'
  })
}

export function insertSinger(data) {
  return request({
    url: '/singer',
    method: 'post',
    data
  })
}

export function updateSinger(data) {
  return request({
    url: '/singer',
    method: 'put',
    data
  })
}

export function singerList() {
  return request({
    url: '/singer/list',
    method: 'get',
  })
}