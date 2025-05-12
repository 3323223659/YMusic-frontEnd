import request from '@/utils/request'

export function musicCount() {
  return request({
    url: '/music/count',
    method: 'get',
  })
}

export function musicPage(params) {
  return request({
    url: '/music/page',
    method: 'get',
    params
  })
}

export function deleteMusic(id) {
  return request({
    url: `/music/${id}`,
    method: 'delete',
  })
}

export function insertMusic(data) {
  return request({
    url: '/music',
    method: 'post',
    data
  })
}

export function updateMusic(data) {
  return request({
    url: '/music',
    method: 'put',
    data
  })
}

export function moveToPlaylist(params) {
  return request({
    url: '/music/deleteMusicByPlaylist',
    method: 'delete',
    params
  })
}

export function addToPlaylist(params) {
  return request({
    url: '/music/toPlaylist',
    method: 'post',
    params
  })
}

export function musicList(params) {
  return request({
    url: '/music/list',
    method: 'get',
    params
  })
}