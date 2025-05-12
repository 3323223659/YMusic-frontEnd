import request from '@/utils/request'

export function getPlaylistPage(params) {
  return request({
    url: '/playlist/page',
    method: 'get',
    params
  })
}