import { getToken,setToken,removeToken } from '@/utils/auth'
import { login } from '@/api/admin'

const state = {
  token: getToken()
}

const mutations = {
  setToken(state,token){
    state.token = token
    setToken(token)
  },
  removeToken(state){
    state.token = null
    removeToken()
  }
}

const actions = {
  async login(context,data){
    console.log(data)
    if(await login(data) != null){
      const { token } = await login(data)
      context.commit('setToken',token )
    }
  },
  logout(context){
    context.commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}