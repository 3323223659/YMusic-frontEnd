import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin
  },
  getters
})
