import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadStatus: false
  },
  mutations: {
    changeStatus(state, value) {
      state.loadStatus = value
    }
  },
  actions: {
    setStatus(context, value) {
      context.commit('changeStatus', value)
    }
  },
  modules: {
  }
})
