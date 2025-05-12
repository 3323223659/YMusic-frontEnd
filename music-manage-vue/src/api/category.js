import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/category/page',
    method: 'get',
    params
  })
}

export function insert(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/category',
    method: 'put',
    data
  })
}

export function deleteById(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete',
  })
}

export function categoryList() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}