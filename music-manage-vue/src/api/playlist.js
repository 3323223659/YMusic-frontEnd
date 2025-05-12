import request from '@/utils/request'

export function playlistCount() {
  return request({
    url: '/playlist/count',
    method: 'get',
  })
}

export function playlistPage(params) {
  return request({
    url: '/playlist/page',
    method: 'get',
    params
  })
}

export function deletePlaylist(id) {
  return request({
    url: `/playlist/${id}`,
    method: 'delete'
  })
}

export function insertPlaylist(data) {
  return request({
    url: '/playlist',
    method: 'post',
    data
  })
}

export function updatePlaylist(data) {
  return request({
    url: '/playlist',
    method: 'put',
    data
  })
}

export function playlistList() {
  return request({
    url: '/playlist/list',
    method: 'get',
  })
}