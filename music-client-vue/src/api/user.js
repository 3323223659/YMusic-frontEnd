import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/user/login',
    method: 'put',
    data
  })
}
export function getUserInfo(id){
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}
export function updateUserInfo(data){
  return request({
    url: '/user',
    method: 'post',
    data
  })
}
export function updatePassword(data){
  return request({
    url: '/user/password',
    method: 'put',
    data
  })
}

export function deleteUser(params){
  return request({
    url: '/user',
    method: 'delete',
    params
  })
}