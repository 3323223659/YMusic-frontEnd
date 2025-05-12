import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
})
// 成功1 失败2
service.interceptors.request.use((config) => {
  // 注入token
  if (store.getters.token) {
    config.headers['token']= `${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // axios默认包裹了data
  const { data, msg, code } = response.data
  if (code === 1) {
    if(msg !== null){
      Message({ type: 'success', message: msg })
    }
    return data
  } else {
    Message({ type: 'error', message: msg })
    return Promise.reject(new Error(msg))
  }
}, async (error) => {
  if(error.response.status === 401){
    //token失效
    Message({ type: 'warning', message: 'token超时了'})
    await store.dispatch('admin/logout')
    router.push('/login')
    return Promise.reject(error)
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
