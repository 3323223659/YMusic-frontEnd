const state = {
   musicInfo: {
    path: 'w'
   }
}

const mutations = {
  setMusicInfo(state,musicInfo){
    state.musicInfo = musicInfo
  },
  removeMusicInfo(){
    state.musicInfo = null
  }
}

const actions = {
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}