import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/common/uploadImage',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function uploadAudio(data) {
  return request({
    url: '/common/uploadAudio',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}