import { getToken,setToken,removeToken,getId,setId,removeId } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  id: getId(),
  userInfo: {} // 存储用户基本资料状态
}

const mutations = {
  setToken(state,token){
    state.token = token
    setToken(token)
  },
  setId(state,id){
    state.id = id
    setId(id)
  },
  removeTokenAndId(){
    state.token = null
    state.id = null
    removeToken()
    removeId()
  },
  setUserInfo(state,userInfo){
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    if (await login(data) != null) {
      const { id,token } = await login(data)
      context.commit('setToken', token)
      context.commit('setId',id)
    }
  },
  async getUserInfo(context){
    const result = await getUserInfo(state.id)
    context.commit('setUserInfo',result)
  },
  logout(context){
    context.commit('removeTokenAndId')
    context.commit('setUserInfo',{})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}